// Api search User
// Created by Hung
// 04/11/2023

/* eslint-disable import/no-anonymous-default-export */
import { axiosAdminHung } from "helper/axios";

const searchUser = async(condition) => {
    let url = "";
    if (condition.status === "All") {
        url = `/questions/21b?page=${condition.page}&pageSize=${condition.pageSize}&query=${condition?.query}&startDate=${condition?.startDate}&endDate=${condition?.endDate}`;
    } else {
        url = `/questions/21b?page=${condition.page}&pageSize=${condition.pageSize}&status=${condition.status}&query=${condition?.query}&startDate=${condition?.startDate}&endDate=${condition?.endDate}`;
    }

    const response = await axiosAdminHung.get(url);

    return {
        ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
    };
}

export default {
    searchUser,
};