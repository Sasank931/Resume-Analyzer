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
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password, fullName }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || `Server error: ${response.status} ${response.statusText}` };
      }

      if (!response.ok) {
        throw { response: { data } };
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        throw error;
      }
      // Handle network errors (e.g. TypeError: Failed to fetch)
      throw { 
        response: { 
          data: { 
            message: "Unable to connect to the server. Please check your internet connection and ensure the backend is running." 
          } 
        } 
      };
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
