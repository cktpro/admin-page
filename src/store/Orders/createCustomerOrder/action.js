

import * as ActionTypes from './actionTypes';

export const actionCreateCustomerOrder = (payload) => ({ //lấy data từ api
  type: ActionTypes.CREATE_CUSTOMER_ORDER,
  payload, //điều kiện nhận vào để get data
});

export const actionCreateCustomerOrderSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CREATE_CUSTOMER_ORDER_SUCCESS,
  payload, //data trả về
});

export const actionCreateCustomerOrderFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CREATE_CUSTOMER_ORDER_FAILED,
  payload, //data
});

export const actionResetCreateCustomerOrder = () => ({ //reset state get order list
  type: ActionTypes.RESET_CREATE_CUSTOMER_ORDER,
});
