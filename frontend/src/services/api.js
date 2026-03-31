import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Remove trailing slash if present
const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

const api = axios.create({
  baseURL: `${baseUrl}/api`,
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
  register: async (username, password, fullName) => {
    try {
      const response = await api.post('/auth/register', { username, password, fullName });
      return response.data;
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

export const analyzerService = {
  analyze: async (formData) => {
    const fullUrl = `${baseUrl}/api/analyze`;
    console.log("API URL:", fullUrl);
    
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        body: formData,
        // Since we're using sessions, we need to include credentials
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Analysis failed:", error);
      throw error;
    }
  },
};

export default api;
