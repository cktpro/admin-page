// actionGetAllOrdersPaid
// Created by Man Nguyen
// 19/10/2023

import ordersPaid from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersPaidSuccess, actionGetAllOrdersPaidFailed } from './action';

function* getAllOrdersPaid(action) {
    try {
      const response = yield ordersPaid.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersPaidSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersPaidFailed(error));
       
    }
  }

  export default function* ordersPaidSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS_Paid, getAllOrdersPaid);
  };
