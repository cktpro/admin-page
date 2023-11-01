// actiongetOrderDetail
// Created by Man Nguyen
// 19/10/2023

import getOrderDetail from 'api/orders/getOrderDetail';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actiongetOrderDetailSuccess, actiongetOrderDetailFailed } from './action';

function* doGetOrderDetail(action) {
    try {
      const response = yield getOrderDetail.getOrderDetail(action.payload);
  
      yield put(actiongetOrderDetailSuccess(response));
    } catch (error) {
      yield put(actiongetOrderDetailFailed(error));
       
    }
  }

  export default function* getOrderDetailSaga() {
    yield takeLeading(ActionTypes.GET_ORDER_DETAIL, doGetOrderDetail);
  };
