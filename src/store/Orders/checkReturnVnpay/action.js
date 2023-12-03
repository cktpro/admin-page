

import * as ActionTypes from './actionTypes';

export const actionCheckReturnVnpay = (payload) => ({ //lấy data từ api
  type: ActionTypes.CHECK_RETURN_VNPAY,
  payload, //điều kiện nhận vào để get data
});

export const actionCheckReturnVnpaySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CHECK_RETURN_VNPAY_SUCCESS,
  payload, //data trả về
});

export const actionCheckReturnVnpayFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CHECK_RETURN_VNPAY_FAILED,
  payload, //data
});

export const actionResetCheckReturnVnpay = () => ({ //reset state get order list
  type: ActionTypes.RESET_CHECK_RETURN_VNPAY,
});
