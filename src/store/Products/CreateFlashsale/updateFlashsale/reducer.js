

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: [],
};

const updateFlashsaleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FLASH_SALE:
            return { ...state, isLoading: true };

        case ActionTypes.UPDATE_FLASH_SALE_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.UPDATE_FLASH_SALE_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_UPDATE_FLASH_SALE:
            return { ...state, payload: defaultState.payload, isLoading: defaultState.isLoading };

        default:
            return state;
    }
};

export default updateFlashsaleReducer;
