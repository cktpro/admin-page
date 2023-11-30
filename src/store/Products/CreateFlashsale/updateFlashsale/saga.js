// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

import flashsale from 'api/flashsale/index';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionUpdateFlashsaleSuccess, actionUpdateFlashsaleFailed } from './action';

function* doUpdateAllFlashsale(action) {
    try {
      const response = yield flashsale.updateFlashsale(action.payload);
  
      yield put(actionUpdateFlashsaleSuccess(response));
    } catch (error) {
      yield put(actionUpdateFlashsaleFailed(error));
       
    }
  }

  export default function* updateFlashsaleSaga() {
    yield takeLeading(ActionTypes.UPDATE_FLASH_SALE, doUpdateAllFlashsale);
  };
