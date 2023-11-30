// Api get order list
// Created by Man Nguyen
// 19/10/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const getAllOrders = async (condition) => {
  let url = "";

  if (condition.status) {
    url = `/orders-admin?page=${condition.page}&pageSize=${condition.pageSize}&status=${condition.status}`;
  } else {
    url = `/orders-admin?page=${condition.page}&pageSize=${condition.pageSize}`;
  }

  const response = await axiosAdminMan.get(url);

  // console.log('««««« response.data »»»»»', response.data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getAllOrders,
};