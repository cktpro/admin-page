

import createCustomerOrder from 'api/orders/createCustomerOrder';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCreateCustomerOrderSuccess, actionCreateCustomerOrderFailed } from './action';

function* doCreateCustomerOrder(action) {
    try {
      const response = yield createCustomerOrder.createCustomerOrder(action.payload);
  
      yield put(actionCreateCustomerOrderSuccess(response));
    } catch (error) {
      yield put(actionCreateCustomerOrderFailed(error?.response?.data));
       
    }
  }

  export default function* createCustomerOrderSaga() {
    yield takeLeading(ActionTypes.CREATE_CUSTOMER_ORDER, doCreateCustomerOrder);
  };
