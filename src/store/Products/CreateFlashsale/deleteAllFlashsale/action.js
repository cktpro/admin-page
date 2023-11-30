

import * as ActionTypes from './actionTypes';

export const actionDeleteAllFlashsale = () => ({ 
  type: ActionTypes.DELETE_ALL_FLASH_SALE,
});

export const actionDeleteAllFlashsaleSuccess = (payload) => ({ 
  type: ActionTypes.DELETE_ALL_FLASH_SALE_SUCCESS,
  payload,
});

export const actionDeleteAllFlashsaleFailed = (payload) => ({ 
  type: ActionTypes.DELETE_ALL_FLASH_SALE_FAILED,
  payload,
});

export const actionResetDeleteAllFlashsale = () => ({ 
  type: ActionTypes.RESET_DELETE_ALL_FLASH_SALE,
});
