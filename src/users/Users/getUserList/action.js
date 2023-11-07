// actionGetAllUsers
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllUsers = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_ALL_USERS,
    payload, //điều kiện nhận vào để get data
});

export const actionGetAllUsersSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_ALL_USERS_SUCCESS,
    payload, //data trả về
});

export const actionGetAllUsersFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_ALL_USERS_FAILED,
    payload, //data
});

export const actionResetGetAllUsers = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_ALL_USERS,
});