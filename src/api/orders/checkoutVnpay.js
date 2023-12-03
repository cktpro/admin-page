

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const checkoutVnpay = async (data) => {
  const url = "/vnPay/create_payment_url";

  const response = await axiosAdminMan.post(url, data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

const checkReturnVnpay = async (data) => {
  const queryArray = Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`);

  const url = `/vnPay/vnpay_return?${queryArray.join("&")}`;

  const response = await axiosAdminMan.get(url, data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

const checkIpnVnpay = async (data) => {
  const queryArray = Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`);

  const url = `/vnPay/check_ipn?${queryArray.join("&")}`;

  const response = await axiosAdminMan.get(url, data);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  checkoutVnpay,
  checkReturnVnpay,
  checkIpnVnpay,
};