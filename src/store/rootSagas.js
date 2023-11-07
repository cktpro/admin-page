// declare saga
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo Saga */
import { all, fork } from 'redux-saga/effects';

import ordersSaga from './Orders/getOrderList/saga';
import ordersCompletedSaga from './Orders/getOrderListCompleted/saga';
import getAllOrdersWaiting from './Orders/getOrderListWaiting/saga';
import ordersCanceledSaga from './Orders/getOrderListCanceled/saga';
import getAllOrdersRejected from './Orders/getOrderListRejected/saga';
import ordersDelivering from './Orders/getOrderListDelivering/saga';

import ordersStatusSaga from './Orders/getNumOfStatus/saga';

import searchOrdersSaga from './Orders/searchOrders/saga';

export default function* rootSaga() {
    yield all([
        fork(ordersSaga),
        fork(ordersCompletedSaga),
        fork(getAllOrdersWaiting),
        fork(ordersCanceledSaga),
        fork(getAllOrdersRejected),
        fork(ordersDelivering),

        fork(ordersStatusSaga),

        fork(searchOrdersSaga),
    ]);
}