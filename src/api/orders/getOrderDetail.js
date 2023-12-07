// Api get order detail
// Created by Man Nguyen
// 29/10/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const getOrderDetail = async (id) => {
  let url = `/orders-admin/${id}`;

  const response = await axiosAdminMan.get(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

const updateOrderDetail = async (data) => {
  const { id } = data;
  delete data.id;
  let url = `/orders-admin/${id}`;

  const response = await axiosAdminMan.put(url, data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getOrderDetail,
  updateOrderDetail,
};