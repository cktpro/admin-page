// actionGetAllUsersWaiting
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllUsersWaiting = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_ALL_USERS_WAITING,
    payload, //điều kiện nhận vào để get data
});

export const actionGetAllUsersWaitingSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_ALL_USERS_WAITING_SUCCESS,
    payload, //data trả về
});

export const actionGetAllUsersWaitingFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_ALL_USERS_WAITING_FAILED,
    payload, //data
});

export const actionResetGetAllUsersWaiting = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_ALL_USERS_WAITING,
});