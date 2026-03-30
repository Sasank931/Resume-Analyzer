import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username, password, fullName) => {
    const response = await api.post('/auth/register', { username, password, fullName });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
};

export const resumeService = {
  upload: async (formData) => {
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/resume/${id}`);
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/resume/history');
    return response.data;
  },
};

export default api;
