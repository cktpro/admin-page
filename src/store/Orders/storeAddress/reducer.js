

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    payload: {},
};

const storeAddressReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ADDRESS:
            return { ...state };

        case ActionTypes.ADD_ADDRESS:
            return { ...state, payload: action.payload };

        case ActionTypes.DELETE_ADDRESS:
            return { ...state, payload: defaultState.payload };

        case ActionTypes.RESET_ADDRESS:
            return { ...state, payload: defaultState.payload };

        default:
            return state;
    }
};

export default storeAddressReducer;
