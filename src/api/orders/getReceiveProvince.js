/* eslint-disable import/no-anonymous-default-export */
import { axiosGHN } from "helper/axios";

const getReceiveProvince = async () => {

  const url = process.env.REACT_APP_URL_GET_PROVINCE;

  const response = await axiosGHN.get(url);

  return {
    ...response.data
  };
}

export default {
  getReceiveProvince,
};