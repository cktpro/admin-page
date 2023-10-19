// actionGetAllOrdersCompleted
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetAllOrdersCompleted = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS_COMPLETED,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersCompletedSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_COMPLETED_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersCompletedFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_COMPLETED_FAILED,
  payload, //data
});

export const actionResetGetAllOrdersCompleted = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS_COMPLETED,
});
