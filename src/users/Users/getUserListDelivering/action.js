// actionGetAllUsersDelivering
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllUsersDelivering = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_ALL_USERS_DELIVERING,
    payload, //điều kiện nhận vào để get data
});

export const actionGetAllUsersDeliveringSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_ALL_USERS_DELIVERING_SUCCESS,
    payload, //data trả về
});

export const actionGetAllUsersDeliveringFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_ALL_USERS_DELIVERING_FAILED,
    payload, //data
});

export const actionResetGetAllUsersDelivering = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_ALL_USERS_DELIVERING,
});