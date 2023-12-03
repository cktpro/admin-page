

import searchCustomer from 'api/orders/searchCustomer';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionsearchCustomerSuccess, actionsearchCustomerFailed } from './action';

function* doSearchCustomer(action) {
    try {
      const response = yield searchCustomer.searchCustomer(action.payload);
  
      yield put(actionsearchCustomerSuccess(response));
    } catch (error) {
      yield put(actionsearchCustomerFailed(error?.response?.data));
       
    }
  }

  export default function* searchCustomerOrderSaga() {
    yield takeLeading(ActionTypes.SEARCH_CUSTOMER, doSearchCustomer);
  };
