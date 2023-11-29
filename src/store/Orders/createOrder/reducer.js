

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const createOrderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_ORDER:
            return { ...state, isLoading: true };

        case ActionTypes.CREATE_ORDER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CREATE_ORDER_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_CREATE_ORDER:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default createOrderReducer;
