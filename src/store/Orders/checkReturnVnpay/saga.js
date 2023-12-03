

import CheckReturnVnpay from 'api/orders/checkoutVnpay';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCheckReturnVnpaySuccess, actionCheckReturnVnpayFailed } from './action';

function* doCheckReturnVnpay(action) {
    try {
      const response = yield CheckReturnVnpay.checkReturnVnpay(action.payload);
  
      yield put(actionCheckReturnVnpaySuccess(response));
    } catch (error) {
      yield put(actionCheckReturnVnpayFailed(error?.response?.data));
       
    }
  }

  export default function* checkReturnVnpaySaga() {
    yield takeLeading(ActionTypes.CHECK_RETURN_VNPAY, doCheckReturnVnpay);
  };
