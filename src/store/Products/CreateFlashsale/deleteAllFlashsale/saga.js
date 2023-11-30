

import flashsale from 'api/flashsale/index';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionDeleteAllFlashsaleSuccess, actionDeleteAllFlashsaleFailed } from './action';

function* doDeleteAllFlashsale() {
    try {
      const response = yield flashsale.deleteAllFlashsale();
  
      yield put(actionDeleteAllFlashsaleSuccess(response));
    } catch (error) {
      yield put(actionDeleteAllFlashsaleFailed(error));
       
    }
  }

  export default function* updateFlashsaleSaga() {
    yield takeLeading(ActionTypes.DELETE_ALL_FLASH_SALE, doDeleteAllFlashsale);
  };
