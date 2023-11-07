// declare saga
// Created by Hung dev
// 05/11/2023

/* quy phạm khai báo Saga */
import { all, fork } from 'redux-saga/effects';

import UsersSaga from './Users/getOrderList/saga';
import UsersCompletedSaga from './Users/getOrderListCompleted/saga';
import getAllUsersWaiting from './Users/getOrderListWaiting/saga';
import UsersCanceledSaga from './Users/getOrderListCanceled/saga';
import getAllUsersRejected from './Users/getOrderListRejected/saga';
import UsersDelivering from './Users/getOrderListDelivering/saga';

import UsersStatusSaga from './Users/getNumOfStatus/saga';

import searchUsersSaga from './Users/searchUsers/saga';

export default function* rootSaga() {
    yield all([
        fork(UsersSaga),
        fork(UsersCompletedSaga),
        fork(getAllUsersWaiting),
        fork(UsersCanceledSaga),
        fork(getAllUsersRejected),
        fork(UsersDelivering),

        fork(UsersStatusSaga),

        fork(searchUsersSaga),
    ]);
}