// actionGetAllUsersRejected
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllUsersRejected = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_ALL_USERS_REJECTED,
    payload, //điều kiện nhận vào để get data
});

export const actionGetAllUsersRejectedSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_ALL_USERS_REJECTED_SUCCESS,
    payload, //data trả về
});

export const actionGetAllUsersRejectedFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_ALL_USERS_REJECTED_FAILED,
    payload, //data
});

export const actionResetGetAllUsersRejected = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_ALL_USERS_REJECTED,
});