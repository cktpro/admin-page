

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: [],
};

const deleteAllFlashsaleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_ALL_FLASH_SALE:
            return { ...state, isLoading: true };

        case ActionTypes.DELETE_ALL_FLASH_SALE_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.DELETE_ALL_FLASH_SALE_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.RESET_DELETE_ALL_FLASH_SALE:
            return { ...state, payload: defaultState.payload, isLoading: defaultState.isLoading };

        default:
            return state;
    }
};

export default deleteAllFlashsaleReducer;
