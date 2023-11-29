// actionGetReceiveProvince
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

export const actionGetReceiveProvince = () => ({ //lấy data từ api
  type: ActionTypes.GET_RECEIVE_PROVINCE,
});

export const actionGetReceiveProvinceSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_RECEIVE_PROVINCE_SUCCESS,
  payload, //data trả về
});

export const actionGetReceiveProvinceFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_RECEIVE_PROVINCE_FAILED,
  payload, //data
});

export const actionResetGetReceiveProvince = () => ({ //reset state get order list
  type: ActionTypes.RESET_GET_RECEIVE_PROVINCE,
});
