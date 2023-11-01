// actionGetAllOrdersRejected
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllOrdersRejected = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS_REJECTED,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersRejectedSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_REJECTED_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersRejectedFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_REJECTED_FAILED,
  payload, //data
});

export const actionResetGetAllOrdersRejected = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS_REJECTED,
});
