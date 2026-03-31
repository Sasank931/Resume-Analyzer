import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Aggressively clean the base URL: remove trailing slashes and dots
const getBaseUrl = () => {
  if (!API_BASE_URL) return 'http://localhost:8080';
  let url = API_BASE_URL.trim();
  // Remove trailing slashes and dots
  while (url.endsWith('/') || url.endsWith('.')) {
    url = url.slice(0, -1);
  }
  return url;
};

const baseUrl = getBaseUrl();

const api = axios.create({
  baseURL: `${baseUrl}/api`,
});

export const analyzerService = {
  analyze: async (formData) => {
    const fullUrl = `${baseUrl}/api/analyze`;
    console.log("Constructed API URL:", fullUrl);
    
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
      console.error("Analysis network error:", error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error(`Unable to reach the backend at ${fullUrl}. 
        Please check:
        1. VITE_API_BASE_URL environment variable (current: ${baseUrl})
        2. Backend status on Railway (should be running)
        3. CORS settings on the backend`);
      }
      throw error;
    }
  },
};

export default api;
