// actionGetAllUsersCompleted
// Created by Man Nguyen
// 19/10/2023

import usersCompleted from 'api/users/getUserList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllUsersCompletedSuccess, actionGetAllUsersCompletedFailed } from './action';

function* getAllUsersCompleted(action) {
    try {
        const response = yield usersCompleted.getAllUsers(action.payload);

        yield put(actionGetAllUsersCompletedSuccess(response));
    } catch (error) {
        yield put(actionGetAllUsersCompletedFailed(error));

    }
}

export default function* usersCompletedSaga() {
    yield takeLeading(ActionTypes.GET_ALL_USERS_COMPLETED, getAllUsersCompleted);
};