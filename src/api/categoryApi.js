import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";  
import { message } from "antd";
import { Navigate, useParams } from "react-router-dom";
import { LOCATIONS } from "constants";

const getCategory = async () => {
  try {
    const result = await axiosAdmin.get("/categories");
    return result;
  } catch (error) {
    return error;
  }
};

const getCategoryDetail = async (id) => {
  try {
    const result = await axiosAdmin.get(`/categories/${id}`);
    console.log('««««« result »»»»»', result);
    return result;
  } catch (error) {
    console.log('««««« err »»»»»', error);
    return error;
  }
};
const onAddCategory = async (categoryData) => {
  try {
    const result = await axiosAdmin.post("/categories", categoryData);
    message.success(result.data.message);
    return result;
  } catch (error) {
    message.error(error.response.data.message);
    return error;
  }
};
const updateCategory = async (id, updatedData) => {
  try {
    console.log('««««« id »»»»»', id);
    const response = await axiosAdmin.put(`/categories/${id}`, updatedData);
    message.success(response.data.message);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    // throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật danh mục");
    return false;
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axiosAdmin.patch(`/categories/delete/${id}`);
    message.success(response.data.message);
    window.location.reload();
    return response.data;
  } catch (error) {
    message.error(error.response.data.message);
    throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi xóa danh mục");
  }

};

export { getCategory, getCategoryDetail, onAddCategory, updateCategory, deleteCategory,};
