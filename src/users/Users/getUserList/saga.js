// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

import users from 'api/users/getUserList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllUsersSuccess, actionGetAllUsersFailed } from './action';

function* getAllUsers(action) {
    try {
        const response = yield users.getAllUsers(action.payload);

        yield put(actionGetAllUsersSuccess(response));
    } catch (error) {
        yield put(actionGetAllUsersFailed(error));

    }
}

export default function* usersSaga() {
    yield takeLeading(ActionTypes.GET_ALL_USERS, getAllUsers);
};