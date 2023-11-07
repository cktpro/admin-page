// actionGetAllUsersCompleted
// Created by Hung dev
// 05/11/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllUsersCompleted = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_ALL_USERS_COMPLETED,
    payload, //điều kiện nhận vào để get data
});

export const actionGetAllUsersCompletedSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_ALL_USERS_COMPLETED_SUCCESS,
    payload, //data trả về
});

export const actionGetAllUsersCompletedFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_ALL_USERS_COMPLETED_FAILED,
    payload, //data
});

export const actionResetGetAllUsersCompleted = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_ALL_USERS_COMPLETED,
});