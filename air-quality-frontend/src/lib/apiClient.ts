// lib/apiClient.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    const res = await api.get(url, { params });
    return res.data;
  },

  post: async <T>(url: string, data?: any): Promise<T> => {
    const res = await api.post(url, data);
    return res.data;
  },

  put: async <T>(url: string, data?: any): Promise<T> => {
    const res = await api.put(url, data);
    return res.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const res = await api.delete(url);
    return res.data;
  },
};
