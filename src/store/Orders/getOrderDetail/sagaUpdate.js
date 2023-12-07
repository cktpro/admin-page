// actiongetOrderDetail
// Created by Man Nguyen
// 19/10/2023

import updateOrderDetail from 'api/orders/getOrderDetail';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actiongetOrderDetailSuccess, actiongetOrderDetailFailed } from './action';

function* doUpdateOrderDetail(action) {
    try {
      const response = yield updateOrderDetail.updateOrderDetail(action.payload);
  
      yield put(actiongetOrderDetailSuccess(response));
    } catch (error) {
      yield put(actiongetOrderDetailFailed(error));
       
    }
  }

  export default function* updateOrderDetailSaga() {
    yield takeLeading(ActionTypes.UPDATE_ORDER_DETAIL, doUpdateOrderDetail);
  };
