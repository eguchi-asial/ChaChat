import * as feedApi from './feed';
import axios, { AxiosRequestConfig } from 'axios';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.baseURL = process.env.VUE_APP_CHAT_HTTPS;
  config.responseType = 'json';
  return config;
});

export { feedApi };
