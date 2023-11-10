// search orders
// Created by Man Nguyen
// 20/10/2023

import * as ActionTypes from './actionTypes';

export const actionsearchCustomer = (payload) => ({ //lấy data từ api
  type: ActionTypes.SEARCH_CUSTOMER,
  payload, //điều kiện nhận vào để get data
});

export const actionsearchCustomerSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.SEARCH_CUSTOMER_SUCCESS,
  payload, //data trả về
});

export const actionsearchCustomerFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.SEARCH_CUSTOMER_FAILED,
  payload, //data
});

export const actionResetsearchCustomer = () => ({ //reset state get order list
  type: ActionTypes.RESET_SEARCH_CUSTOMER,
});
