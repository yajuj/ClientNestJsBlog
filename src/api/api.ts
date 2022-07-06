import axios from 'axios';
import { AuthResponce } from '../types/auth-responsce';

const API_URL = '';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(
    'access_token'
  )}`;
  return config;
});

api.interceptors.response.use(
  config => {
    return config;
  },
  async err => {
    const originalRequest = err.config;
    if (err.response.status == 401 && err.config && !err._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponce>(
          `${API_URL}/auth/refresh`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
            },
          }
        );
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        return api.request(originalRequest);
      } catch (error) {}
    }
    throw Error;
  }
);

export default api;
