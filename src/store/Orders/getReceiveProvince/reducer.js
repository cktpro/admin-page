

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: [],
};

const getReceiveProvinceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_RECEIVE_PROVINCE:
            return { ...state, isLoading: true };

        case ActionTypes.GET_RECEIVE_PROVINCE_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_RECEIVE_PROVINCE_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_GET_RECEIVE_PROVINCE:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default getReceiveProvinceReducer;
