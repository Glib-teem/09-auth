import axios from 'axios';

// Axios instance для ЗОВНІШНЬОГО API
export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
