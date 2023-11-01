// ordersStatusSaga
// Created by Man Nguyen
// 19/10/2023

import ordersStatus from 'api/orders/getNumOfOrdersStatus';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetNumOfOrdersStatusSuccess, actionGetNumOfOrdersStatusFailed } from './action';

function* getNumOfOrdersStatus(action) {
    try {
      const response = yield ordersStatus.getNumOfOrdersStatus(action.payload);
  
      yield put(actionGetNumOfOrdersStatusSuccess(response));
    } catch (error) {
      yield put(actionGetNumOfOrdersStatusFailed(error));
       
    }
  }

  export default function* ordersStatusSaga() {
    yield takeLeading(ActionTypes.GET_NUM_OF_ORDERS_STATUS, getNumOfOrdersStatus);
  };
