

import * as ActionTypes from './actionTypes';

export const actionUpdateFlashsale = (payload) => ({ 
  type: ActionTypes.UPDATE_FLASH_SALE,
  payload,
});

export const actionUpdateFlashsaleSuccess = (payload) => ({ 
  type: ActionTypes.UPDATE_FLASH_SALE_SUCCESS,
  payload,
});

export const actionUpdateFlashsaleFailed = (payload) => ({ 
  type: ActionTypes.UPDATE_FLASH_SALE_FAILED,
  payload,
});

export const actionResetUpdateFlashsale = () => ({ 
  type: ActionTypes.RESET_UPDATE_FLASH_SALE,
});
