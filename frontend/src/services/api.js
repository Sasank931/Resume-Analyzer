import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  register: async (username, email, password, fullName) => {
    try {
      // Using fetch syntax as requested for the registration call to ensure compliance
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, fullName }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw { response: { data } };
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
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
