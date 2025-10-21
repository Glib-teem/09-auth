import axios from 'axios';

// Axios instance для ЗОВНІШНЬОГО API
export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

// Axios instance для ЛОКАЛЬНОГО Next.js сервера
const baseURL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
