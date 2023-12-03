

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: [],
};

const storeProductsFlashsaleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FLASH_SALE_DETAILS:
            return { ...state, isLoading: true };

        case ActionTypes.GET_FLASH_SALE_DETAILS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_FLASH_SALE_DETAILS_FAILED:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.ADD_PRODUCT_TO_FLASH_SALE_DETAILS:
            return { ...state, payload: [...state.payload, action.payload] }

        case ActionTypes.CHANGE_STOCK_ON_FLASH_SALE_DETAILS:
            const updateProductsStock = state.payload.map((item) => {
                return (
                    item.productId === action.payload.productId ? { ...item, flashsaleStock: parseInt(action.payload.flashsaleStock), } : item
                )
            });

            return { ...state, payload: updateProductsStock };

        case ActionTypes.CHANGE_DISCOUNT_ON_FLASH_SALE_DETAILS:
            const updateProductsDiscount = state.payload.map((item) => {
                return (
                    item.productId === action.payload.productId ? { ...item, discount: parseInt(action.payload.discount), } : item
                )
            });

            return { ...state, payload: updateProductsDiscount };

        case ActionTypes.DELETE_PRODUCT_FROM_FLASH_SALE_DETAILS:
            const updatePayload = state.payload.filter((item) => {
                return item.productId !== action.payload
            });

            return { ...state, payload: updatePayload };

        case ActionTypes.RESET_FLASH_SALE_DETAILS:
            return { ...state, payload: defaultState.payload, isLoading: defaultState.isLoading };

        default:
            return state;
    }
};

export default storeProductsFlashsaleReducer;
