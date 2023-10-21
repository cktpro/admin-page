// search orders
// Created by Man Nguyen
// 20/10/2023

import * as ActionTypes from './actionTypes';

export const actionsearchOrders = (payload) => ({ //lấy data từ api
  type: ActionTypes.SEARCH_ORDERS,
  payload, //điều kiện nhận vào để get data
});

export const actionsearchOrdersSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.SEARCH_ORDERS_SUCCESS,
  payload, //data trả về
});

export const actionsearchOrdersFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.SEARCH_ORDERS_FAILED,
  payload, //data
});

export const actionResetsearchOrders = () => ({ //reset state get order list
  type: ActionTypes.RESET_SEARCH_ORDERS,
});
