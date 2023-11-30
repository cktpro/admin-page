

import * as ActionTypes from './actionTypes';

export const actionGetTimeFlashsale = () => ({ 
  type: ActionTypes.GET_TIME_FLASH_SALE,
});

export const actionGetTimeFlashsaleSuccess = (payload) => ({ 
  type: ActionTypes.GET_TIME_FLASH_SALE_SUCCESS,
  payload,
});

export const actionGetTimeFlashsaleFailed = (payload) => ({ 
  type: ActionTypes.GET_TIME_FLASH_SALE_FAILED,
  payload,
});

export const actionUpdateTimeFlashsaleLocal = (payload) => ({ 
  type: ActionTypes.UPDATE_TIME_FLASH_SALE,
  payload,
});

export const actionResetGetTimeFlashsale = () => ({ 
  type: ActionTypes.RESET_GET_TIME_FLASH_SALE,
});
