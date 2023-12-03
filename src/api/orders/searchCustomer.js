// Api search Customer
// Created by Man Nguyen
// 02/11/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const searchCustomer = async (condition) => {
  const url = `/orders-admin/search/customer?phoneNumber=${condition}`;

  const response = await axiosAdminMan.get(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  searchCustomer,
};