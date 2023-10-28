// actionsearchOrders
// Created by Man Nguyen
// 20/10/2023

import * as ActionTypes from './actionTypes';
import { pageSize } from "constants/index"

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {
        total: 0,
        numOfShow: 0,
        page: 1,
        pageSize: parseInt(pageSize),
        payload: [],
    },
};

const searchOrdersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_ORDERS:
            return { ...state, isLoading: true };

        case ActionTypes.SEARCH_ORDERS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.SEARCH_ORDERS_FAILED:
            console.log('««««« action.payload »»»»»', action.payload);
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_SEARCH_ORDERS:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default searchOrdersReducer;
