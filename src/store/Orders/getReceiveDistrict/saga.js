

import getReceiveDistrict from 'api/orders/getReceiveDistrict';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetReceiveDistrictSuccess, actionGetReceiveDistrictFailed } from './action';

function* doGetReceiveDistrict(action) {
    try {
      const response = yield getReceiveDistrict.getReceiveDistrict(action.payload);
  
      yield put(actionGetReceiveDistrictSuccess(response));
    } catch (error) {
      yield put(actionGetReceiveDistrictFailed(error));
       
    }
  }

  export default function* getReceiveDistrictSaga() {
    yield takeLeading(ActionTypes.GET_RECEIVE_DISTRICT, doGetReceiveDistrict);
  };
