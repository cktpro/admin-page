// actionGetNumOfOrdersStatus
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetNumOfOrdersStatus = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_NUM_OF_ORDERS_STATUS,
  payload, //điều kiện nhận vào để get data
});

export const actionGetNumOfOrdersStatusSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_NUM_OF_ORDERS_STATUS_SUCCESS,
  payload, //data trả về
});

export const actionGetNumOfOrdersStatusFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_NUM_OF_ORDERS_STATUS_FAILED,
  payload, //data
});

export const actionResetGetNumOfOrdersStatus = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_NUM_OF_ORDERS_STATUS,
});
