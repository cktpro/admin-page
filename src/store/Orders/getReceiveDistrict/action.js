

import * as ActionTypes from './actionTypes';

export const actionGetReceiveDistrict = (payload) => ({ //lấy data từ api
  type: ActionTypes.GET_RECEIVE_DISTRICT,
  payload, //điều kiện nhận vào để get data
});

export const actionGetReceiveDistrictSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_RECEIVE_DISTRICT_SUCCESS,
  payload, //data trả về
});

export const actionGetReceiveDistrictFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_RECEIVE_DISTRICT_FAILED,
  payload, //data
});

export const actionResetGetReceiveDistrict = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_RECEIVE_DISTRICT,
});
