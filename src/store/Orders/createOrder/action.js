

import * as ActionTypes from './actionTypes';

export const actionCreateOrder = (payload) => ({ //lấy data từ api
  type: ActionTypes.CREATE_ORDER,
  payload, //điều kiện nhận vào để get data
});

export const actionCreateOrderSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CREATE_ORDER_SUCCESS,
  payload, //data trả về
});

export const actionCreateOrderFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CREATE_ORDER_FAILED,
  payload, //data
});

export const actionResetCreateOrder = () => ({ //reset state get order list
  type: ActionTypes.RESET_CREATE_ORDER,
});
