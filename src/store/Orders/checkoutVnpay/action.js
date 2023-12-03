

import * as ActionTypes from './actionTypes';

export const actionCheckoutVnpay = (payload) => ({ //lấy data từ api
  type: ActionTypes.CHECKOUT_VNPAY,
  payload, //điều kiện nhận vào để get data
});

export const actionCheckoutVnpaySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CHECKOUT_VNPAY_SUCCESS,
  payload, //data trả về
});

export const actionCheckoutVnpayFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CHECKOUT_VNPAY_FAILED,
  payload, //data
});

export const actionResetCheckoutVnpay = () => ({ //reset state get order list
  type: ActionTypes.RESET_CHECKOUT_VNPAY,
});
