// actionGetAllOrders
// Created by Man Nguyen
// 19/10/2023

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

const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_ORDERS:
            return { ...state, isLoading: true };

        case ActionTypes.GET_ALL_ORDERS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_ALL_ORDERS_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_GET_ALL_ORDERS:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default orderReducer;
