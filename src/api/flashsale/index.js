

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminMan } from "helper/axios";

const getAllFlashsale = async () => {
  const url = "/flashSale";

  const response = await axiosAdminMan.get(url);

  const data = response.data.payload.map((item) => {
    return (
      {
        productId: item.productId,
        flashsaleStock: item.flashsaleStock,
        stock: item.product.stock,
        discount: item.discount,
        image: item.product.image.location,
        name: item.product.name,
        price: item.product.price,
      }
    )
  })

  return [...data];
};

const updateFlashsale = async (data) => {
  const url = "/flashSale";

  const response = await axiosAdminMan.post(url, data);

  return {
    ...response.data,
  };
};

const deleteAllFlashsale = async (data) => {
  const url = "/flashSale";

  const response = await axiosAdminMan.delete(url);

  return {
    ...response.data,
  };
};

const updateTimeFlashsale = async (data) => {
  const url = "/time-flashsale";

  const response = await axiosAdminMan.post(url, data);

  return {
    ...response.data,
  };
};

const getTimeFlashsale = async () => {
  const url = "/time-flashsale";

  const response = await axiosAdminMan.get(url);

  return {
    ...response.data.payload,
  };
};


export default {
  getAllFlashsale,
  updateFlashsale,
  deleteAllFlashsale,
  updateTimeFlashsale,
  getTimeFlashsale,
};