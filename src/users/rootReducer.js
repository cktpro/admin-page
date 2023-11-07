// declare redux
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo rootReducer */
import { combineReducers } from 'redux';

import userReducer from './Users/getUserList/reducer';
import userCompletedReducer from './Users/getuserListCompleted/reducer';
import userWaitingReducer from './Users/getuserListWaiting/reducer';
import userCanceledReducer from './Users/getuserListCanceled/reducer';
import userRejectedReducer from './Users/getuserListRejected/reducer';
import userDeliveringReducer from './Users/getuserListDelivering/reducer';

import getNumOfUsersStatusReducer from './Users/getNumOfStatus/reducer';

import searchUsersReducer from './Users/searchUsers/reducer';

const rootReducer = combineReducers({
    userReducer,
    userCompletedReducer,
    userWaitingReducer,
    userCanceledReducer,
    userRejectedReducer,
    userDeliveringReducer,

    getNumOfUsersStatusReducer,

    searchUsersReducer,
});

export default rootReducer;