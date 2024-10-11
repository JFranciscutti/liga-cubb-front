import axios from 'axios';
import { environment } from 'src/environment/environment';

export const httpClient = axios.create({
  baseURL: environment.backEnd,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'ngrok-skip-browser-warning': true,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const username = 'admin';
    const password = 'password';
    const token = btoa(`${username}:${password}`);

    if (config.headers) {
      config.headers['Authorization'] = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
