import axios from 'axios';
export const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_ADMIN,
  headers: { "Content-Type": "application/json" },
});