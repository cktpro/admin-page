// getNumOfOrdersStatusReducer
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {
        totalWaiting: 0,
        totalCompleted: 0,
        totalCanceled: 0,
        totalRejected: 0,
        totalDelivering: 0
    },
};

const getNumOfOrdersStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_NUM_OF_ORDERS_STATUS:
            return { ...state, isLoading: true };

        case ActionTypes.GET_NUM_OF_ORDERS_STATUS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_NUM_OF_ORDERS_STATUS_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_GET_NUM_OF_ORDERS_STATUS:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default getNumOfOrdersStatusReducer;
