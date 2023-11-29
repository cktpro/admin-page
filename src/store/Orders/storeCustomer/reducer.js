

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    payload: {},
};

const storeCustomerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_CUSTOMER:
            return { ...state };

        case ActionTypes.ADD_CUSTOMER:
            return { ...state, payload: action.payload };

        case ActionTypes.DELETE_CUSTOMER:
            return { ...state, payload: defaultState.payload };

        default:
            return state;
    }
};

export default storeCustomerReducer;
