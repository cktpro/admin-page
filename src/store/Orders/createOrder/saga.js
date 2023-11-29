

import createOrder from 'api/orders/createOrder';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCreateOrderSuccess, actionCreateOrderFailed } from './action';

function* doCreateOrder(action) {
    try {
      const response = yield createOrder.createOrder(action.payload);
  
      yield put(actionCreateOrderSuccess(response));
    } catch (error) {
      yield put(actionCreateOrderFailed(error?.response?.data));
       
    }
  }

  export default function* createOrderSaga() {
    yield takeLeading(ActionTypes.CREATE_ORDER, doCreateOrder);
  };
