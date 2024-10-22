import { applyService } from './request';

const defHttp = applyService({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
});

export default defHttp;
