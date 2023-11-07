// search users
// Created by Hung dev
// 05/11/2023

import * as ActionTypes from './actionTypes';

export const actionsearchUsers = (payload) => ({ //lấy data từ api
    type: ActionTypes.SEARCH_USERS,
    payload, //điều kiện nhận vào để get data
});

export const actionsearchUsersSuccess = (payload) => ({ //lấy data từ api thành công
    type: ActionTypes.SEARCH_USERS_SUCCESS,
    payload, //data trả về
});

export const actionsearchUsersFailed = (payload) => ({ //lấy data từ api thất bại
    type: ActionTypes.SEARCH_USERS_FAILED,
    payload, //data
});

export const actionResetsearchUsers = () => ({ //reset state get user list
    type: ActionTypes.RESET_SEARCH_USERS,
});