// actionGetAllOrdersWaiting
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllOrdersWaiting = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS_WAITING,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersWaitingSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_WAITING_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersWaitingFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_WAITING_FAILED,
  payload, //data
});

export const actionResetGetAllOrdersWaiting = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS_WAITING,
});
