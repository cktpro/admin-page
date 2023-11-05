// actionsearchCustomer
// Created by Man Nguyen
// 19/10/2023

import searchCustomer from 'api/orders/searchCustomer';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionsearchCustomerSuccess, actionsearchCustomerFailed } from './action';

function* doSearchCustomer(action) {
    try {
      const response = yield searchCustomer.searchCustomer(action.payload);
  
      yield put(actionsearchCustomerSuccess(response));
    } catch (error) {
      yield put(actionsearchCustomerFailed(error));
       
    }
  }

  export default function* searchCustomerOrderSaga() {
    yield takeLeading(ActionTypes.SEARCH_CUSTOMER, doSearchCustomer);
  };
