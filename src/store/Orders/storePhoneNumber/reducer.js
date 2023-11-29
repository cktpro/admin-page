

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    payload: {},
};

const storePhoneNumberReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_PHONE_NUMBER:
            return { ...state };

        case ActionTypes.ADD_PHONE_NUMBER:
            return { ...state, payload: action.payload };

        case ActionTypes.DELETE_PHONE_NUMBER:
            return { ...state, payload: defaultState.payload };

        case ActionTypes.RESET_PHONE_NUMBER:
            return { ...state, payload: defaultState.payload };

        default:
            return state;
    }
};

export default storePhoneNumberReducer;
