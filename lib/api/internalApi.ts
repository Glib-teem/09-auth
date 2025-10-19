import axios from 'axios';

const internalBaseURL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api';

export const internalBffApi = axios.create({
  baseURL: internalBaseURL,
  withCredentials: true,
});
