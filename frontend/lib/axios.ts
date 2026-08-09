import axios from 'axios';
import { env } from '@/config/env';
import { ApiError, ApiResponse } from './types';

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(/(?:^| )accessToken=([^;]+)/);
      if (match && match[1]) {
        config.headers.Authorization = `Bearer ${match[1]}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status || 500;
    const data = error.response?.data as ApiResponse | undefined;
    const message = data?.message || error.message || 'An unexpected error occurred';
    
    return Promise.reject(new ApiError(message, status, data));
  }
);
