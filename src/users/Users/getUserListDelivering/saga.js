// actionGetAllUsersDelivering
// Created by Man Nguyen
// 19/10/2023

import usersDelivering from 'api/users/getUserList';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllUsersDeliveringSuccess, actionGetAllUsersDeliveringFailed } from './action';

function* getAllUsersDelivering(action) {
    try {
        const response = yield usersDelivering.getAllUsers(action.payload);

        yield put(actionGetAllUsersDeliveringSuccess(response));
    } catch (error) {
        yield put(actionGetAllUsersDeliveringFailed(error));

    }
}

export default function* usersDeliveringSaga() {
    yield takeLeading(ActionTypes.GET_ALL_USERS_DELIVERING, getAllUsersDelivering);
};