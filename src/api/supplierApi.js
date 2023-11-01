import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getSupplier = async () => {
  try {
    const result = await axiosAdmin.get("/suppliers");
    return result;
  } catch (error) {
    return error;
  }
};

export { getSupplier  };
