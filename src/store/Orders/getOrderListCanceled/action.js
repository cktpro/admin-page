import * as ActionTypes from './actionTypes';

export const actionGetAllOrdersCanceled = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_ALL_ORDERS_CANCELED,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllOrdersCanceledSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_ORDERS_CANCELED_SUCCESS,
  payload, //data trả về
});

export const actionGetAllOrdersCanceledFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_ORDERS_CANCELED_FAILED,
  payload, //data
});

export const actionResetGetAllOrdersCanceled = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_ALL_ORDERS_CANCELED,
});
