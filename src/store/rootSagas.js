// declare saga
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo Saga */
import { all, fork } from 'redux-saga/effects';

//order---------------------------------------------------------------------------//
import ordersSaga from './Orders/getOrderList/saga';
import ordersCompletedSaga from './Orders/getOrderListCompleted/saga';
import getAllOrdersWaiting from './Orders/getOrderListWaiting/saga';
import ordersCanceledSaga from './Orders/getOrderListCanceled/saga';
import getAllOrdersRejected from './Orders/getOrderListRejected/saga';
import ordersDelivering from './Orders/getOrderListDelivering/saga';

import ordersStatusSaga from './Orders/getNumOfStatus/saga';

import searchOrdersSaga from './Orders/searchOrders/saga';

import getOrderDetailSaga from './Orders/getOrderDetail/saga';

import searchCustomerOrderSaga from './Orders/searchCustomer/saga';

import searchProductOrderSaga from './Orders/searchProduct/saga';

import createCustomerOrderSaga from './Orders/createCustomerOrder/saga';
import getReceiveProvinceSaga from './Orders/getReceiveProvince/saga';
import getReceiveDistrictSaga from './Orders/getReceiveDistrict/saga';
import getReceiveWardSaga from './Orders/getReceiveWard/saga';
import getShippingFeeSaga from './Orders/getShippingFee/saga';
import createOrderSaga from './Orders/createOrder/saga';
//------------------------------------------------------------------------------------//

import usersaga from './User/saga';

export default function* rootSaga() {
  yield all([

    //order---------------------------------------------------------------------------//
    fork(ordersSaga),
    fork(ordersCompletedSaga),
    fork(getAllOrdersWaiting),
    fork(ordersCanceledSaga),
    fork(getAllOrdersRejected),
    fork(ordersDelivering),

    fork(ordersStatusSaga),

    fork(searchOrdersSaga),

    fork(getOrderDetailSaga),

    fork(searchCustomerOrderSaga),

    fork(searchProductOrderSaga),

    fork(createCustomerOrderSaga),
    fork(getReceiveProvinceSaga),
    fork(getReceiveDistrictSaga),
    fork(getReceiveWardSaga),
    fork(getShippingFeeSaga),
    fork(createOrderSaga),
    //------------------------------------------------------------------------------------//

    fork(usersaga),

  ]);
}