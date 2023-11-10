

import * as ActionTypes from './actionTypes';

export const actionSearchProduct = (payload) => ({ //lấy data từ api
  type: ActionTypes.SEARCH_PRODUCT,
  payload, //điều kiện nhận vào để get data
});

export const actionSearchProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.SEARCH_PRODUCT_SUCCESS,
  payload, //data trả về
});

export const actionSearchProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.SEARCH_PRODUCT_FAILED,
  payload, //data
});

export const actionResetSearchProduct = () => ({ //reset state get order list
  type: ActionTypes.RESET_SEARCH_PRODUCT,
});
