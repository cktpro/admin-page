

import CheckoutVnpay from 'api/orders/checkoutVnpay';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCheckoutVnpaySuccess, actionCheckoutVnpayFailed } from './action';

function* doCheckoutVnpay(action) {
    try {
      const response = yield CheckoutVnpay.checkoutVnpay(action.payload);
  
      yield put(actionCheckoutVnpaySuccess(response));
    } catch (error) {
      yield put(actionCheckoutVnpayFailed(error?.response?.data));
       
    }
  }

  export default function* CheckoutVnpaySaga() {
    yield takeLeading(ActionTypes.CHECKOUT_VNPAY, doCheckoutVnpay);
  };
