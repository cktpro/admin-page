

import * as ActionTypes from './actionTypes';

export const actionGetFlashsaleDetails = () => ({ 
  type: ActionTypes.GET_FLASH_SALE_DETAILS,
});

export const actionGetFlashsaleDetailsSuccess = (payload) => ({ 
  type: ActionTypes.GET_FLASH_SALE_DETAILS_SUCCESS,
  payload,
});

export const actionGetFlashsaleDetailsFailed = (payload) => ({ 
  type: ActionTypes.GET_FLASH_SALE_DETAILS_FAILED,
  payload,
});

export const actionAddProductToFlashsaleDetails = (payload) => ({ 
  type: ActionTypes.ADD_PRODUCT_TO_FLASH_SALE_DETAILS,
  payload, 
});

export const actionChangeStockOnFlashsaleDetails = (payload) => ({ 
  type: ActionTypes.CHANGE_STOCK_ON_FLASH_SALE_DETAILS,
  payload, 
});

export const actionChangeDiscountOnFlashsaleDetails = (payload) => ({ 
  type: ActionTypes.CHANGE_DISCOUNT_ON_FLASH_SALE_DETAILS,
  payload, 
});

export const actionDeleteProdutFromFlashsaleDetails = (payload) => ({ 
  type: ActionTypes.DELETE_PRODUCT_FROM_FLASH_SALE_DETAILS,
  payload, 
});

export const actionResetFlashsaleDetailList = () => ({ 
  type: ActionTypes.RESET_FLASH_SALE_DETAILS,
});
