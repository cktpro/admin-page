import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getCategory = async () => {
  try {
    const result = await axiosAdmin.get("/categories");
    return result;
  } catch (error) {
    return error;
  }
};
// const getProductDetail = async (id) => {
//     try {
//       const result = await axiosAdmin.get(`/products/${id}`);
//       return result;
//     } catch (error) {
//       return error;
//     }
//   };
export { getCategory  };
