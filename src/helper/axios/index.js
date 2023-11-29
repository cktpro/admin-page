// config axios
// Created by Man Nguyen
// 19/10/2023

import axios from 'axios';

const axiosAdminMan = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosGHN = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Token": process.env.REACT_APP_TOKEN_GHN,
    "ShopId": process.env.REACT_APP_USER_ID_GHN,
  },
});

export {
  axiosAdminMan, axiosGHN
}