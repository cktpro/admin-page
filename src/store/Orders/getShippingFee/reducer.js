// getNumOfOrdersStatusReducer
// Created by Man Nguyen
// 19/10/2023

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const getShippingFeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SHIPPING_FEE:
            return { ...state, isLoading: true };

        case ActionTypes.GET_SHIPPING_FEE_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_SHIPPING_FEE_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_GET_SHIPPING_FEE:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default getShippingFeeReducer;
