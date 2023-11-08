// declare redux
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import orderReducer from "./Orders/getOrderList/reducer";
import orderCanceledReducer from "./Orders/getOrderListCanceled/reducer";
import orderCompletedReducer from "./Orders/getOrderListCompleted/reducer";
import orderDeliveringReducer from "./Orders/getOrderListDelivering/reducer";
import orderRejectedReducer from "./Orders/getOrderListRejected/reducer";
import orderWaitingReducer from "./Orders/getOrderListWaiting/reducer";

import getNumOfOrdersStatusReducer from "./Orders/getNumOfStatus/reducer";

import searchOrdersReducer from "./Orders/searchOrders/reducer";
import userReducer from "./User/reducer";

const rootReducer = combineReducers({
  orderReducer,
  orderCompletedReducer,
  orderWaitingReducer,
  orderCanceledReducer,
  orderRejectedReducer,
  orderDeliveringReducer,

  getNumOfOrdersStatusReducer,

  searchOrdersReducer,
  userReducer,
});

export default rootReducer;
