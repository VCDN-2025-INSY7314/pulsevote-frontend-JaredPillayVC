import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // using bearer token, not cookies
  headers: { 'Content-Type': 'application/json' }
});

// Attach token automatically (if present)
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('pv_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
