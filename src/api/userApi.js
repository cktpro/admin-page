import { axiosAdminMan } from "helper/axios";
const getListUserApi = async (params) => {
  try {
    const result = await axiosAdminMan.get("/customers", params);
    return result;
  } catch (error) {
    return error;
  }
};

const addUserApi = async (params) => {
  try {
    const result = await axiosAdminMan.post("/customers", params);
    return result;
  } catch (error) {
    return error;
  }
};

const infoUserApi = async (id) => {
  try {
    const result = await axiosAdminMan.get("/customers/" + id);
    return result;
  } catch (error) {
    return error;
  }
};

const updateUserApi = async (params) => {
  try {
    const result = await axiosAdminMan.put("/customers/" + params.id, params);
    return result;
  } catch (error) {
    return error;
  }
};

const deleteUserApi = async (id) => {
  try {
    const result = await axiosAdminMan.patch("/customers/delete/" + id);
    return result;
  } catch (error) {
    return error;
  }
};

export {
  addUserApi,
  deleteUserApi,
  getListUserApi,
  infoUserApi,
  updateUserApi,
};