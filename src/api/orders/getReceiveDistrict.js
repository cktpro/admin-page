/* eslint-disable import/no-anonymous-default-export */
import { axiosGHN } from "helper/axios";

const getReceiveDistrict = async (condition) => {

  const body = { "province_id": parseInt(condition) };

  const url = process.env.REACT_APP_URL_GET_DISTRICT;

  const response = await axiosGHN.post(url, body);

  return {
    ...response.data
  };
}

export default {
  getReceiveDistrict,
};