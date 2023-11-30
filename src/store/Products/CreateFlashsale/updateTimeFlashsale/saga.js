// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

import flashsale from 'api/flashsale/index';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionUpdateTimeFlashsaleSuccess, actionUpdateTimeFlashsaleFailed } from './action';

function* doUpdateTimeFlashsale(action) {
    try {
      const response = yield flashsale.updateTimeFlashsale(action.payload);
  
      yield put(actionUpdateTimeFlashsaleSuccess(response));
    } catch (error) {
      yield put(actionUpdateTimeFlashsaleFailed(error));
       
    }
  }

  export default function* updateTimeFlashsaleSaga() {
    yield takeLeading(ActionTypes.UPDATE_TIME_FLASH_SALE, doUpdateTimeFlashsale);
  };
