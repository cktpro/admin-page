

import flashsale from 'api/flashsale/index';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetTimeFlashsaleSuccess, actionGetTimeFlashsaleFailed } from './action';

function* doGetTimeFlashsale(action) {
    try {
      const response = yield flashsale.getTimeFlashsale(action.payload);
  
      yield put(actionGetTimeFlashsaleSuccess(response));
    } catch (error) {
      yield put(actionGetTimeFlashsaleFailed(error));
       
    }
  }

  export default function* getTimeFlashsaleSaga() {
    yield takeLeading(ActionTypes.GET_TIME_FLASH_SALE, doGetTimeFlashsale);
  };
