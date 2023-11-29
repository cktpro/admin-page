

import * as ActionTypes from './actionTypes';

export const actionGetShippingFee = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_SHIPPING_FEE,
  payload, //điều kiện nhận vào để get data
});

export const actionGetShippingFeeSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_SHIPPING_FEE_SUCCESS,
  payload, //data trả về
});

export const actionGetShippingFeeFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_SHIPPING_FEE_FAILED,
  payload, //data
});

export const actionResetGetShippingFee = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_SHIPPING_FEE,
});
