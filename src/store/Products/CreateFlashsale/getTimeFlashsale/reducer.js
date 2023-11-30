

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const getTimeFlashsaleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_TIME_FLASH_SALE:
            return { ...state, isLoading: true };

        case ActionTypes.GET_TIME_FLASH_SALE_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_TIME_FLASH_SALE_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.UPDATE_TIME_FLASH_SALE:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    expirationTime: action.payload.expirationTime,
                    isOpenFlashsale: action.payload.isOpenFlashsale,
                },
                isLoading: false
            };

        case ActionTypes.RESET_GET_TIME_FLASH_SALE:
            return { ...state, payload: defaultState.payload, isLoading: defaultState.isLoading };

        default:
            return state;
    }
};

export default getTimeFlashsaleReducer;
