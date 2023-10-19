import ordersCanceled from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersCanceledSuccess, actionGetAllOrdersCanceledFailed } from './action';

function* getAllOrdersCanceled(action) {
    try {
      const response = yield ordersCanceled.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersCanceledSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersCanceledFailed(error));
       
    }
  }

  export default function* ordersCanceledSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS_CANCELED, getAllOrdersCanceled);
  };
