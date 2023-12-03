

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const checkIpnVnpayReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CHECK_IPN_VNPAY:
            return { ...state, isLoading: true };

        case ActionTypes.CHECK_IPN_VNPAY_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CHECK_IPN_VNPAY_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_CHECK_IPN_VNPAY:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default checkIpnVnpayReducer;
