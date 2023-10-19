import * as ActionTypes from './actionTypes';

export const actionGetAllOrdersDelivering = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS_DELIVERING,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersDeliveringSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_DELIVERING_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersDeliveringFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_DELIVERING_FAILED,
  payload, //data
});

export const actionResetGetAllOrdersDelivering = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS_DELIVERING,
});
