/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const getNumOfOrdersStatus = async () => {
  const url = "/orders/status";

  const response = await axiosAdminMan.get(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getNumOfOrdersStatus,
};