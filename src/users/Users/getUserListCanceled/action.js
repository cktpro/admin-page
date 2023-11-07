// actionGetAllUsersCanceled
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllUsersCanceled = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_ALL_USERS_CANCELED,
    payload, //điều kiện nhận vào để get data
});

export const actionGetAllUsersCanceledSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_ALL_USERS_CANCELED_SUCCESS,
    payload, //data trả về
});

export const actionGetAllUsersCanceledFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_ALL_USERS_CANCELED_FAILED,
    payload, //data
});

export const actionResetGetAllUsersCanceled = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_ALL_USERS_CANCELED,
});