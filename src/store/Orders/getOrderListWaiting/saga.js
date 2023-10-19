import ordersWaiting from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersWaitingSuccess, actionGetAllOrdersWaitingFailed } from './action';

function* getAllOrdersWaiting(action) {
    try {
      const response = yield ordersWaiting.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersWaitingSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersWaitingFailed(error));
       
    }
  }

  export default function* ordersWaitingSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS_WAITING, getAllOrdersWaiting);
  };
