

import CheckIpnVnpay from 'api/orders/checkoutVnpay';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCheckIpnVnpaySuccess, actionCheckIpnVnpayFailed } from './action';

function* doCheckIpnVnpay(action) {
    try {
      const response = yield CheckIpnVnpay.checkIpnVnpay(action.payload);
  
      yield put(actionCheckIpnVnpaySuccess(response));
    } catch (error) {
      yield put(actionCheckIpnVnpayFailed(error?.response?.data));
       
    }
  }

  export default function* checkIpnVnpaySaga() {
    yield takeLeading(ActionTypes.CHECK_IPN_VNPAY, doCheckIpnVnpay);
  };
