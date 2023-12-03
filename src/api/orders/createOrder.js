

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const createOrder = async (data) => {  
  const url = "/orders-admin";

  const response = await axiosAdminMan.post(url, data);

  localStorage.setItem("orderId", response.data.payload._id)

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  createOrder,
};