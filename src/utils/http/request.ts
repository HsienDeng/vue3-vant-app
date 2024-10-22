import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../js-token';
import { tansParams } from '@/utils/params';
import cache from '../cache';
import { showNotify } from 'vant';
import { errorCode } from './error-code';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

/**
 * 请求拦截器
 * @param instance
 */
export const applyInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const isToken = (config.headers || {}).isToken === false;
      const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;

      if (!isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken();
      }

      if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
      }
      if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
          url: config.url,
          data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
          time: new Date().getTime(),
        };
        const requestSize = Object.keys(JSON.stringify(requestObj)).length;
        const limitSize = 5 * 1024 * 1024;
        if (requestSize >= limitSize) {
          console.warn(`[${config.url}]: 请求数据大小超出允许的5M限制，无法进行防重复提交验证。`);
          return config;
        }
        const sessionObj = cache.session.getJSON('sessionObj');
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
          cache.session.setJSON('sessionObj', requestObj);
        } else {
          const s_url = sessionObj.url;
          const s_data = sessionObj.data;
          const s_time = sessionObj.time;
          const interval = 1000;
          if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
            const message = '数据正在处理，请勿重复提交';
            console.warn(`[${s_url}]: ${message}`);
            return Promise.reject(new Error(message));
          } else {
            cache.session.setJSON('sessionObj', requestObj);
          }
        }
      }
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      const code = res.data.code || 200;
      const msg = errorCode[code] || res.data.msg || errorCode['default'];
      if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data;
      }
      if (code === 401) {
        return Promise.reject('登录已过期，请重新登录');
      } else if (code === 500) {
        return Promise.reject(new Error(msg));
      } else if (code === 601) {
        return Promise.reject(new Error(msg));
      } else if (code !== 200) {
        return Promise.reject('error');
      } else {
        return Promise.resolve(res.data);
      }
    },
    (error) => {
      const status = error?.response?.status || 400;
      if (status === 401) {
        return Promise.reject('登录已过期，请重新登录');
      }
      let { message } = error;
      if (message === 'Network Error') {
        message = '后端接口连接异常' + error.config.url;
      } else if (message.includes('timeout')) {
        message = '系统接口请求超时' + error.config.url;
      } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常' + error.config.url;
      }
      showNotify({ message: message, type: 'danger', duration: 5 * 1000 });
      return Promise.reject(error);
    },
  );
};

export const createMethods = (instance) => ({
  request: (config: AxiosRequestConfig, options?) => instance.request({ ...config }, options),
  get: (config: AxiosRequestConfig, options?) => instance.request({ ...config, method: 'get' }, options),
  post: (config: AxiosRequestConfig, options?) => instance.request({ ...config, method: 'post' }, options),
  put: (config: AxiosRequestConfig, options?) => instance.request({ ...config, method: 'put' }, options),
  delete: (config: AxiosRequestConfig, options?) => instance.request({ ...config, method: 'delete' }, options),
});

export const applyService = (config) => {
  // 创建实例
  const service = axios.create({
    ...config,
  });

  /* 添加拦截 */
  applyInterceptors(service);

  return {
    instance: service,
    ...createMethods(service),
  };
};
