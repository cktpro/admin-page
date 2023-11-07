// Api get user list
// Created by Hung dev
// 04/11/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminHung } from "helper/axios";

const getAllUser = async(condition) => {
    let url = "";

    if (condition.status) {
        url = `/user?page=${condition.page}&pageSize=${condition.pageSize}&status=${condition.status}`;
    } else {
        url = `/user?page=${condition.page}&pageSize=${condition.pageSize}`;
    }

    const response = await axiosAdminHung.get(url);

    // console.log('««««« response.data »»»»»', response.data);

    return {
        ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
    };
}

export default {
    getAllUser,
};