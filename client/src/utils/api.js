// API base URL configuration
// In production on Vercel, use relative paths (same domain)
// In development, use the proxy or localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    credentials: 'include', // Important for cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

export default API_BASE_URL;

