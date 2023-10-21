// actionsearchOrders
// Created by Man Nguyen
// 19/10/2023

import searchOrders from 'api/orders/searchOrders';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionsearchOrdersSuccess, actionsearchOrdersFailed } from './action';

function* doSearchOrders(action) {
    try {
      const response = yield searchOrders.searchOrders(action.payload);
  
      yield put(actionsearchOrdersSuccess(response));
    } catch (error) {
      yield put(actionsearchOrdersFailed(error));
       
    }
  }

  export default function* searchOrdersSaga() {
    yield takeLeading(ActionTypes.SEARCH_ORDERS, doSearchOrders);
  };
