// config axios
// Created by Man Nguyen
// 19/10/2023

import axios from 'axios';

const axiosAdminMan = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export {
  axiosAdminMan
}