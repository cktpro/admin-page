

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const CheckoutVnpayReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CHECKOUT_VNPAY:
            return { ...state, isLoading: true };

        case ActionTypes.CHECKOUT_VNPAY_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CHECKOUT_VNPAY_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_CHECKOUT_VNPAY:
            return { ...state, payload: defaultState.payload, isLoading: false };

        default:
            return state;
    }
};

export default CheckoutVnpayReducer;
