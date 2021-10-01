/*
 * @Author: QY
 * @Date: 2020-12-15 11:44:23
 * @LastEditors: QY
 * @LastEditTime: 2021-07-15 11:53:07
 * @Description: http
 * @FilePath: \react-template\src\libs\http.js
 */
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

const TOKEN_TYPE = window.localStorage.getItem('token_type') || 'bearer';
const AUTH_TOKEN = window.localStorage.getItem('access_token');

// axios整体配置
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    Authorization: `${TOKEN_TYPE} ${AUTH_TOKEN}`,
  },
});

// 对请求进行拦截
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 对响应进行拦截
instance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        message.error('身份状态失效，请重新登录');
        window.location.href = `${window.location.origin}/login`;
      }

      if (error.response.status === 500) {
        message.error('请求失败，服务器错误');
      }

      if (error.response.status === 504) {
        message.error('请求超时');
      }
    }

    return Promise.reject(error.response);
  }
);

const http = (method, url, params, config) =>
  instance({
    url,
    method,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    responseType: config?.responseType || 'json',
    headers: {
      'Content-Type': config?.contentType || 'application/json; charset=UTF-8',
    },
    // 若需其他配置，在此处添加。切勿使用 ...config 等不安全的方式
  });

export default {
  /**
   * get，参数为Object，会自动转化为query形式并添加在地址之后
   * @param {string} url 地址
   * @param {object} params 参数
   * @param {object} config 配置，其中属性名应始终为驼峰式写法
   */
  get(url, params, config) {
    return http('GET', url, params, config);
  },
  /**
   * post，参数为Object或FormData，此时content-type为 application/json或multipart/form-data，无需手动指定
   * @param {string} url 地址
   * @param {object|FormData} params 参数
   * @param {object} config 配置，其中属性名应始终为驼峰式写法
   */
  post(url, params, config) {
    return http('POST', url, params, config);
  },
  /**
   * post 表单，参数为表单键值对或Object，若为Object则会自动转化为键值对，此时content-type为 application/x-www-form-urlencoded
   * @param {string} url 地址
   * @param {object} params 参数
   * @param {object} config 配置，其中属性名应始终为驼峰式写法
   */
  postForm(url, params, config) {
    if (typeof params === 'object') {
      params = qs.stringify(params);
    }
    return http('POST', url, params, { ...config, contentType: 'application/x-www-form-urlencoded' });
  },
  put(url, params, config) {
    return http('PUT', url, params, config);
  },
  delete(url, params, config) {
    return http('DELETE', url, params, config);
  },
};
