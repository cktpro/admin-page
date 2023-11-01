import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getUser = async() => {
    try {
        const result = await axiosAdmin.get("/user");
        return result;
    } catch (error) {
        return error;
    }
};
const getUserAccount = async(id) => {
    try {
        const result = await axiosAdmin.get(`/user/${id}`);
        return result;
    } catch (error) {
        return error;
    }
};
export { getUser, getUserAccount };