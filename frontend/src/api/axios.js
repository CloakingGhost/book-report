import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: BASE_URL, // 기본 API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
