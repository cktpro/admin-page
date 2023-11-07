// Api get num of user status
// Created by Hung dev
// 04/11/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminHung } from "helper/axios";

const getNumOfUserStatus = async() => {
    const url = "/user/status";

    const response = await axiosAdminHung.get(url);

    return {
        ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
    };
}

export default {
    getNumOfUserStatus,
};