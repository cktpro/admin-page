// actionGetNumOfUsersStatus
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetNumOfUsersStatus = (payload) => ({ //lấy data từ api
    type: ActionTypes.GET_NUM_OF_USERS_STATUS,
    payload, //điều kiện nhận vào để get data
});

export const actionGetNumOfUsersStatusSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.GET_NUM_OF_USERS_STATUS_SUCCESS,
    payload, //data trả về
});

export const actionGetNumOfUsersStatusFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.GET_NUM_OF_USERS_STATUS_FAILED,
    payload, //data
});

export const actionResetGetNumOfUsersStatus = () => ({ //reset state get user list
    type: ActionTypes.RESET_GET_NUM_OF_USERS_STATUS,
});