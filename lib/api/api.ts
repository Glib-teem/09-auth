import axios from 'axios';

const externalBaseURL = process.env.NEXT_PUBLIC_API_URL;

if (!externalBaseURL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not defined in environment variables'
  );
}

export const api = axios.create({
  baseURL: externalBaseURL,
  withCredentials: true,
});
