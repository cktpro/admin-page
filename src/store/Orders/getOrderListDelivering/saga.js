import ordersDelivering from 'api/orders/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllOrdersDeliveringSuccess, actionGetAllOrdersDeliveringFailed } from './action';

function* getAllOrdersDelivering(action) {
    try {
      const response = yield ordersDelivering.getAllOrders(action.payload);
  
      yield put(actionGetAllOrdersDeliveringSuccess(response));
    } catch (error) {
      yield put(actionGetAllOrdersDeliveringFailed(error));
       
    }
  }

  export default function* ordersDeliveringSaga() {
    yield takeLeading(ActionTypes.GET_ALL_ORDERS_DELIVERING, getAllOrdersDelivering);
  };
