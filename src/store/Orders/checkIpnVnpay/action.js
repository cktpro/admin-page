

import * as ActionTypes from './actionTypes';

export const actionCheckIpnVnpay = (payload) => ({ //lấy data từ api
  type: ActionTypes.CHECK_IPN_VNPAY,
  payload, //điều kiện nhận vào để get data
});

export const actionCheckIpnVnpaySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CHECK_IPN_VNPAY_SUCCESS,
  payload, //data trả về
});

export const actionCheckIpnVnpayFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CHECK_IPN_VNPAY_FAILED,
  payload, //data
});

export const actionResetCheckIpnVnpay = () => ({ //reset state get order list
  type: ActionTypes.RESET_CHECK_IPN_VNPAY,
});
