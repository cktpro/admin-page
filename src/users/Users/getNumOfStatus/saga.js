// usersStatusSaga
// Created by Man Nguyen
// 19/10/2023

import usersStatus from 'api/users/getNumOfUsersStatus';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetNumOfUsersStatusSuccess, actionGetNumOfUsersStatusFailed } from './action';

function* getNumOfUsersStatus(action) {
    try {
        const response = yield usersStatus.getNumOfUsersStatus(action.payload);

        yield put(actionGetNumOfUsersStatusSuccess(response));
    } catch (error) {
        yield put(actionGetNumOfUsersStatusFailed(error));

    }
}

export default function* usersStatusSaga() {
    yield takeLeading(ActionTypes.GET_NUM_OF_USERS_STATUS, getNumOfUsersStatus);
};