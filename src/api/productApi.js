import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getProduct = async () => {
  try {
    const result = await axiosAdmin.get("/products");
    return result;
  } catch (error) {
    return error;
  }
};
const getProductDetail = async (id) => {
    try {
      const result = await axiosAdmin.get(`/products/${id}`);
      return result;
    } catch (error) {
      return error;
    }
  };
export { getProduct,getProductDetail  };
