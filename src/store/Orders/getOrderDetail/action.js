// get orders detail
// Created by Man Nguyen
// 29/10/2023

import * as ActionTypes from './actionTypes';

export const actiongetOrderDetail = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ORDER_DETAIL,
  payload, //điều kiện nhận vào để get data
});

export const actionUpdateOrderDetail = (payload) => ({ //lấy data từ api
  type: ActionTypes.UPDATE_ORDER_DETAIL,
  payload, //điều kiện nhận vào để get data
});

export const actiongetOrderDetailSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ORDER_DETAIL_SUCCESS,
  payload, //data trả về
});

export const actiongetOrderDetailFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ORDER_DETAIL_FAILED,
  payload, //data
});

export const actionResetgetOrderDetail = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ORDER_DETAIL,
});
