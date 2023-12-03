// getNumOfOrdersStatusReducer
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: [],
};

const getReceiveDistrictReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_RECEIVE_DISTRICT:
            return { ...state, isLoading: true };

        case ActionTypes.GET_RECEIVE_DISTRICT_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_RECEIVE_DISTRICT_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_GET_RECEIVE_DISTRICT:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default getReceiveDistrictReducer;
