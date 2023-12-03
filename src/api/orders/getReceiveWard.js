/* eslint-disable import/no-anonymous-default-export */
import { axiosGHN } from "helper/axios";

const getReceiveWard = async (condition) => {
  const body = { "district_id": parseInt(condition) };

  const url = process.env.REACT_APP_URL_GET_WARD;

  const response = await axiosGHN.post(url, body);

  return {
    ...response.data
  };
}

export default {
  getReceiveWard,
};