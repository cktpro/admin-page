// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllOrders = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_FAILED,
  payload, //data
});

export const actionResetGetAllOrders = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS,
});
