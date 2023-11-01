// Api get order detail
// Created by Man Nguyen
// 29/10/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const getOrderDetail = async (id) => {
  let url = `/orders/${id}`;

  const response = await axiosAdminMan.get(url);

  // console.log('««««« response.data »»»»»', response.data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getOrderDetail,
};