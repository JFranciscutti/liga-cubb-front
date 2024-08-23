import axios from 'axios';
import { environment } from 'src/environment/environment';

export const httpClient = axios.create({
  baseURL: environment.backEnd,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'ngrok-skip-browser-warning': true,
  },
});
