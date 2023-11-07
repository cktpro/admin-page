// actionGetAllUsersCanceled
// Created by Man Nguyen
// 19/10/2023

import usersCanceled from 'api/users/getOrderList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllUsersCanceledSuccess, actionGetAllUsersCanceledFailed } from './action';

function* getAllUsersCanceled(action) {
    try {
        const response = yield usersCanceled.getAllUsers(action.payload);

        yield put(actionGetAllUsersCanceledSuccess(response));
    } catch (error) {
        yield put(actionGetAllUsersCanceledFailed(error));

    }
}

export default function* usersCanceledSaga() {
    yield takeLeading(ActionTypes.GET_ALL_USERS_CANCELED, getAllUsersCanceled);
};