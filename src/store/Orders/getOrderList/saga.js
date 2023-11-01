// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

import orders from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersSuccess, actionGetAllOrdersFailed } from './action';

function* getAllOrders(action) {
    try {
      const response = yield orders.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersFailed(error));
       
    }
  }

  export default function* ordersSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS, getAllOrders);
  };
