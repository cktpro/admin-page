// getOrderDetailReducer
// Created by Man Nguyen
// 29/10/2023

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: []
};

const getOrderDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ORDER_DETAIL:
            return { ...state, isLoading: true };

        case ActionTypes.UPDATE_ORDER_DETAIL:
            return { ...state, isLoading: true };

        case ActionTypes.GET_ORDER_DETAIL_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_ORDER_DETAIL_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_GET_ORDER_DETAIL:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default getOrderDetailReducer;
