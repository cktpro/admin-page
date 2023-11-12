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
      message.success('Thêm sản phẩm thành công');
      window.location.reload();
      return result;
    } catch (error) {
      return error;
    }
  };
  
  const deleteProduct = async (id) => {
    try {
      const response = await axiosAdmin.patch(`/products/delete/${id}`);
      message.success('Xóa sản phẩm thành công');
      window.location.reload();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const handleSearch = async (keyword) => {
    if (keyword.trim() === '') {
      message.warning('Please enter some keyword to search.');
      return false;
  }
    try {
    const response = await axiosAdmin.get(`/products/search/?name=${keyword}`);
    
    console.log('««««« keyword »»»»»', keyword);
    console.log('««««« response search »»»»»', response.data);
    return response.data;
}catch (error) {
  throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi tim sản phẩm");
}
};

export { getProduct,getProductDetail,onAddProduct, deleteProduct, handleSearch};
