import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { message } from "antd";
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
  const onAddProduct = async (productData) => {
    try {
      const result = await axiosAdmin.post("/products", productData);
      message.success(result.data.message);
      window.location.reload();
      return result;
    } catch (error) {
      message.error(error.response.data.message);
      return error;
    }
  };
  
  // const deleteProduct = async (id) => {
  //   try {
  //     const response = await axiosAdmin.patch(`/products/delete/${id}`);
  //     message.success(response.data.message);
  //     window.location.reload();
  //     return response.data;
  //   } catch (error) {
  //     message.error(error.response.data.message);
  //     throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm");
  //   }
  // };
  

  const handleSearch = async (keyword) => {
    if (keyword.trim() === '') {
      message.warning('Please enter some keyword to search.');
      return false;
  }
    try {
      // window.location.href = `/products/search/?name=${keyword}`;
    const response = await axiosAdmin.get(`/products/search/?name=${keyword}`);
    console.log('««««« keyword »»»»»', keyword);
    console.log('««««« response search »»»»»', response.data);
    return response.data;
}catch (error) {
  throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi tim sản phẩm");
}
};

const updateProduct = async (id, updatedData) => {
  try {
    console.log('««««« id »»»»»', id);
    
    const response = await axiosAdmin.put(`/products/${id}`, updatedData);
    message.success(response.data.message);
    console.log('««««« response »»»»»', response);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    console.log('««««« data.error »»»»»', error);
    return false;
  }
};
export { getProduct,getProductDetail,onAddProduct, handleSearch, updateProduct};
