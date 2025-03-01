import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: BASE_URL, // 기본 API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
