// actionsearchCustomer
// Created by Man Nguyen
// 20/10/2023

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: [],
};

const searchCustomerOrderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_CUSTOMER:
            return { ...state, isLoading: true };

        case ActionTypes.SEARCH_CUSTOMER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.SEARCH_CUSTOMER_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_SEARCH_CUSTOMER:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default searchCustomerOrderReducer;
