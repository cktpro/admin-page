

import getReceiveWard from 'api/orders/getReceiveWard';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetReceiveWardSuccess, actionGetReceiveWardFailed } from './action';

function* doGetReceiveWard(action) {
    try {
      const response = yield getReceiveWard.getReceiveWard(action.payload);
  
      yield put(actionGetReceiveWardSuccess(response));
    } catch (error) {
      yield put(actionGetReceiveWardFailed(error));
       
    }
  }

  export default function* getReceiveWardSaga() {
    yield takeLeading(ActionTypes.GET_RECEIVE_WARD, doGetReceiveWard);
  };
