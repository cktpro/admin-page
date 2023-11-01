// actionGetAllOrdersRejected
// Created by Man Nguyen
// 19/10/2023

import ordersRejected from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersRejectedSuccess, actionGetAllOrdersRejectedFailed } from './action';

function* getAllOrdersRejected(action) {
    try {
      const response = yield ordersRejected.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersRejectedSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersRejectedFailed(error));
       
    }
  }

  export default function* ordersRejectedSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS_REJECTED, getAllOrdersRejected);
  };
