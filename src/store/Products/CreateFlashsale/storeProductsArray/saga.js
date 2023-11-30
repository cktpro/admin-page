// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

import flashsale from 'api/flashsale/index';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetFlashsaleDetailsSuccess, actionGetFlashsaleDetailsFailed } from './action';

function* doGetAllFlashsale() {
    try {
      const response = yield flashsale.getAllFlashsale();
  
      yield put(actionGetFlashsaleDetailsSuccess(response));
    } catch (error) {
      yield put(actionGetFlashsaleDetailsFailed(error));
       
    }
  }

  export default function* flashsaleSaga() {
    yield takeLeading(ActionTypes.GET_FLASH_SALE_DETAILS, doGetAllFlashsale);
  };
