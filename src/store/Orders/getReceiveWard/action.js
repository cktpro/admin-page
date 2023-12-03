

import * as ActionTypes from './actionTypes';

export const actionGetReceiveWard = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_RECEIVE_WARD,
  payload, //điều kiện nhận vào để get data
});

export const actionGetReceiveWardSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_RECEIVE_WARD_SUCCESS,
  payload, //data trả về
});

export const actionGetReceiveWardFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_RECEIVE_WARD_FAILED,
  payload, //data
});

export const actionResetGetReceiveWard = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_RECEIVE_WARD,
});
