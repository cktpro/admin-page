import axios from 'axios';
export const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_ADMIN,
  // headers: { "Content-Type": "application/json" },
});
axiosAdmin.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("TOKEN");

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);