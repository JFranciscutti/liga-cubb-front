import axios from 'axios';
import { environment } from 'src/environment/environment';
import { getCookie } from 'typescript-cookie';

export const httpClient = axios.create({
  baseURL: environment.backEnd,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'ngrok-skip-browser-warning': true,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (getCookie('token')) {
      const token = getCookie('token');
      if (config.headers) {
        config.headers['Authorization'] = `Basic ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
