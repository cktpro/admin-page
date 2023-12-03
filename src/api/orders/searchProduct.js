

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const searchProduct = async (condition) => {
  let url = `/products-admin/search-for-order?query=${condition}`;

  const response = await axiosAdminMan.get(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  searchProduct,
};