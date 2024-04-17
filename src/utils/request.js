import axios from 'axios';
import storage from 'store2';
import { getUrlParam } from '@/utils/frontend-utils';

export const url = path => {
  return import.meta.env.VITE_API_URL + path;
};

export const download = parameter => {
  location.href = import.meta.env.VITE_API_URL + parameter;
};

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT // 超时
});

// 发起请求之前的拦截器
request.interceptors.request.use(
  config => {
    const token = storage.get('token');

    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    // get 请求转换参数处理
    if (config.method && config.data && config.method.toLowerCase() === 'get') {
      const getParam = {};
      for (const o in config.data) {
        getParam[o] = config?.data[o] === undefined ? '' : encodeURIComponent(config?.data[o]);
      }
      config.url += '?' + getUrlParam(getParam);
    }

    if (config.url.indexOf('http') === 0) {
      config.baseURL = '';
    }

    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  ({ data, status }) => {
    const res = data;
    if (status !== 200) {
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  error => {
    console.log(error);
    const status = error.response?.status;
    switch (status) {
      /* eslint-disable no-param-reassign */
      case 400:
        error.msg = '请求错误';
        break;
      case 401:
        error.msg = '未授权，请登录';
        break;
      case 403:
        error.msg = '拒绝访问';
        break;
      case 404:
        error.msg = `请求地址出错: ${error.response?.config.url}`;
        break;
      case 408:
        error.msg = '请求超时';
        break;
      case 500:
        error.msg = '服务器内部错误';
        break;
      case 501:
        error.msg = '服务未实现';
        break;
      case 502:
        error.msg = '网关错误';
        break;
      case 503:
        error.msg = '服务不可用';
        break;
      case 504:
        error.msg = '网关超时';
        break;
      case 505:
        error.msg = 'HTTP版本不受支持';
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
