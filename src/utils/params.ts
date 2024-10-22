
/**
 * 去除某个url中的指定参数
 * @param url
 * @param params
 * @returns
 */
export function removeParams(url, params) {
  const urlParts = url.split('?');
  if (urlParts.length >= 2) {
    const prefix = urlParts[0];
    const paramsString = urlParts[1];
    let paramsArr = paramsString.split('&');

    paramsArr = paramsArr.filter((param) => {
      const key = param.split('=')[0];
      return !params.includes(key);
    });

    url = prefix + (paramsArr.length > 0 ? '?' + paramsArr.join('&') : '');
    return url;
  } else {
    return url;
  }
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = encodeURIComponent(propName) + '=';
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}
