// declare redux
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo rootReducer */
import { combineReducers } from 'redux';

import orderReducer from './Orders/getOrderList/reducer';
import orderCompletedReducer from './Orders/getOrderListCompleted/reducer';
import orderWaitingReducer from './Orders/getOrderListWaiting/reducer';
import orderCanceledReducer from './Orders/getOrderListCanceled/reducer';
import orderRejectedReducer from './Orders/getOrderListRejected/reducer';
import orderDeliveringReducer from './Orders/getOrderListDelivering/reducer';

import getNumOfOrdersStatusReducer from './Orders/getNumOfStatus/reducer';

import searchOrdersReducer from './Orders/searchOrders/reducer';

import getOrderDetailReducer from './Orders/getOrderDetail/reducer';

import searchCustomerOrderReducer from './Orders/searchCustomer/reducer';

const rootReducer = combineReducers({
  orderReducer,
  orderCompletedReducer,
  orderWaitingReducer,
  orderCanceledReducer,
  orderRejectedReducer,
  orderDeliveringReducer,

  getNumOfOrdersStatusReducer,

  searchOrdersReducer,

  getOrderDetailReducer,

  searchCustomerOrderReducer,
});

export default rootReducer;
