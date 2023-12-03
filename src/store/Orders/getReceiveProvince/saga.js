

import getReceiveProvince from 'api/orders/getReceiveProvince';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetReceiveProvinceSuccess, actionGetReceiveProvinceFailed } from './action';

function* doGetReceiveProvince() {
    try {
      const response = yield getReceiveProvince.getReceiveProvince();
  
      yield put(actionGetReceiveProvinceSuccess(response));
    } catch (error) {
      yield put(actionGetReceiveProvinceFailed(error));
       
    }
  }

  export default function* getReceiveProvinceSaga() {
    yield takeLeading(ActionTypes.GET_RECEIVE_PROVINCE, doGetReceiveProvince);
  };
