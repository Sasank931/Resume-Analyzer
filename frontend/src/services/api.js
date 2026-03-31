import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Remove trailing slash if present
const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

const api = axios.create({
  baseURL: `${baseUrl}/api`,
});

export const analyzerService = {
  analyze: async (formData) => {
    const fullUrl = `${baseUrl}/api/analyze`;
    console.log("API URL:", fullUrl);
    
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        body: formData,
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
