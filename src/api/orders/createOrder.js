

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const createOrder = async (data) => {  
  const url = "/orders";

  const response = await axiosAdminMan.post(url, data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  createOrder,
};