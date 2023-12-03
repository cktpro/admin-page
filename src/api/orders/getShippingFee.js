/* eslint-disable import/no-anonymous-default-export */
import { districtCodeSend } from "constants/index";
import { axiosGHN } from "helper/axios";

const getShippingFee = async (data) => {
  try {
    let serviceId;
    const urlGetService = process.env.REACT_APP_URL_GET_SERVICE;

    const dataGetService = {
      "shop_id": parseInt(process.env.REACT_APP_USER_ID_GHN),
      "from_district": parseInt(districtCodeSend),
      "to_district": parseInt(data.to_district_id)
    }

    const getService = await axiosGHN.post(urlGetService, dataGetService)

    if (getService) {
      serviceId = getService.data.data[0].service_id;
    }


    const body = {
      "service_id": parseInt(serviceId),
      "insurance_value": parseInt(data.insurance_value),
      "coupon": null,
      "from_district_id": parseInt(data.from_district_id),
      // "from_ward_code": data.selectWard.toString(),
      "to_district_id": parseInt(data.to_district_id),
      // "to_ward_code": data.selectReceiveWard.toString(),
      "length": parseInt(data.length),
      "width": parseInt(data.width),
      "height": parseInt(data.height),
      "weight": data.weight > 0 ? parseInt(data.weight) : 1,
    };

    const response = await axiosGHN.post(process.env.REACT_APP_URL_GET_FEE, body);

    return {
      ...response.data
    };
  } catch (error) {
    console.log('««««« error »»»»»', error);
  }

}

export default {
  getShippingFee,
};