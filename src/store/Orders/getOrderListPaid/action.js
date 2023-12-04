// actionGetAllOrdersPaid
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllOrdersPaid = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS_Paid,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersPaidSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_Paid_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersPaidFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_Paid_FAILED,
  payload, //data
});

export const actionResetGetAllOrdersPaid = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS_Paid,
});
