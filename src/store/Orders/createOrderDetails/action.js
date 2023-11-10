

import * as ActionTypes from './actionTypes';

export const actionGetOrderDetails = () => ({ 
  type: ActionTypes.GET_ORDER_DETAILS,
});

export const actionAddProductToOrderDetails = (payload) => ({ 
  type: ActionTypes.ADD_PRODUCT_TO_ORDER_DETAILS,
  payload, 
});

export const actionIncreaseProductOnOrderDetails = (payload) => ({ 
  type: ActionTypes.INCREASE_PRODUCT_ON_ORDER_DETAILS,
  payload, 
});

export const actionDeleteProdutFromOrderDetails = (payload) => ({ 
  type: ActionTypes.DELETE_PRODUCT_FROM_ORDER_DETAILS,
  payload, 
});

export const actionResetOrderDetailList = () => ({ 
  type: ActionTypes.RESET_ORDER_DETAILS,
});
