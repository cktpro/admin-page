// actionGetAllUsersWaiting
// Created by Hung dev
// 05/11/2023

import usersWaiting from 'api/users/getUserList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllUsersWaitingSuccess, actionGetAllUsersWaitingFailed } from './action';

function* getAllUsersWaiting(action) {
    try {
        const response = yield usersWaiting.getAllUsers(action.payload);

        yield put(actionGetAllUsersWaitingSuccess(response));
    } catch (error) {
        yield put(actionGetAllUsersWaitingFailed(error));

    }
}

export default function* usersWaitingSaga() {
    yield takeLeading(ActionTypes.GET_ALL_USERS_WAITING, getAllUsersWaiting);
};