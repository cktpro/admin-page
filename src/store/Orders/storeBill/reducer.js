

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    payload: {},
};

const storeBillReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_BILL:
            return { ...state };

        case ActionTypes.ADD_BILL:
            return { ...state, payload: action.payload };

        case ActionTypes.DELETE_BILL:
            return { ...state, payload: defaultState.payload };

        case ActionTypes.RESET_BILL:
            return { ...state, payload: defaultState.payload };

        default:
            return state;
    }
};

export default storeBillReducer;
