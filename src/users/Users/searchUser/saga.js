// actionsearchUsers
// Created by Man Nguyen
// 19/10/2023

import searchUsers from 'api/Users/searchUsers';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionsearchUsersSuccess, actionsearchUsersFailed } from './action';

function* doSearchUsers(action) {
    try {
        const response = yield searchUsers.searchUsers(action.payload);

        yield put(actionsearchUsersSuccess(response));
    } catch (error) {
        yield put(actionsearchUsersFailed(error));

    }
}

export default function* searchUsersSaga() {
    yield takeLeading(ActionTypes.SEARCH_USERS, doSearchUsers);
};