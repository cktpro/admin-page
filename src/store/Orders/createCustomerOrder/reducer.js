// getNumOfOrdersStatusReducer
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const createCustomerOrderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_CUSTOMER_ORDER:
            return { ...state, isLoading: true };

        case ActionTypes.CREATE_CUSTOMER_ORDER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CREATE_CUSTOMER_ORDER_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_CREATE_CUSTOMER_ORDER:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default createCustomerOrderReducer;
