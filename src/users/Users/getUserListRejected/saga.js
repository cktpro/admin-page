// actionGetAllUsersRejected
// Created by Man Nguyen
// 19/10/2023

import usersRejected from 'api/users/getUserList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllUsersRejectedSuccess, actionGetAllUsersRejectedFailed } from './action';

function* getAllUsersRejected(action) {
    try {
        const response = yield usersRejected.getAllUsers(action.payload);

        yield put(actionGetAllUsersRejectedSuccess(response));
    } catch (error) {
        yield put(actionGetAllUsersRejectedFailed(error));

    }
}

export default function* usersRejectedSaga() {
    yield takeLeading(ActionTypes.GET_ALL_USERS_REJECTED, getAllUsersRejected);
};