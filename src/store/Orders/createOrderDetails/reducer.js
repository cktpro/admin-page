

import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    payload: [],
};

const createOrderDetailsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ORDER_DETAILS:
            return { ...state };

        case ActionTypes.ADD_PRODUCT_TO_ORDER_DETAILS:
            let isHaveProduct = false;

            if (state.payload.length === 0) {
                return { ...state, payload: [...state.payload, action.payload] }
            } else {
                for (let item in state.payload) {
                    if (state.payload[item].productId === action.payload.productId) {
                        isHaveProduct = true;
                    }
                }
                
                if (isHaveProduct) {
                    const updateProducts = state.payload.map((item) => {
                        return (
                            item.productId === action.payload.productId ? { ...item, quantity: parseInt(item.quantity) + parseInt(action.payload.quantity), } : item
                            )
                        });

                    return { ...state, payload: updateProducts }
                } else {
                    return { ...state, payload: [...state.payload, action.payload] }
                }
            }

        case ActionTypes.INCREASE_PRODUCT_ON_ORDER_DETAILS:
            const updateProducts2 = state.payload.map((item) => {
                return (
                    item.productId === action.payload.productId ? { ...item, quantity: parseInt(action.payload.quantity), } : item
                )
            });

            return { ...state, payload: updateProducts2 };

        case ActionTypes.DELETE_PRODUCT_FROM_ORDER_DETAILS:
            const updatePayload = state.payload.filter((item) => {
                return item.productId !== action.payload
            });

            return { ...state, payload: updatePayload };

        case ActionTypes.RESET_ORDER_DETAILS:
            return { ...state, payload: defaultState.payload };

        default:
            return state;
    }
};

export default createOrderDetailsReducer;
