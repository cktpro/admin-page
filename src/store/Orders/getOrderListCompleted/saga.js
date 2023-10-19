// actionGetAllOrdersCompleted
// Created by Man Nguyen
// 19/10/2023

import ordersCompleted from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersCompletedSuccess, actionGetAllOrdersCompletedFailed } from './action';

function* getAllOrdersCompleted(action) {
    try {
      const response = yield ordersCompleted.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersCompletedSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersCompletedFailed(error));
       
    }
  }

  export default function* ordersCompletedSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS_COMPLETED, getAllOrdersCompleted);
  };
