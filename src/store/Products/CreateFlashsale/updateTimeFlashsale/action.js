

import * as ActionTypes from './actionTypes';

export const actionUpdateTimeFlashsale = (payload) => ({ 
  type: ActionTypes.UPDATE_TIME_FLASH_SALE,
  payload,
});

export const actionUpdateTimeFlashsaleSuccess = (payload) => ({ 
  type: ActionTypes.UPDATE_TIME_FLASH_SALE_SUCCESS,
  payload,
});

export const actionUpdateTimeFlashsaleFailed = (payload) => ({ 
  type: ActionTypes.UPDATE_TIME_FLASH_SALE_FAILED,
  payload,
});

export const actionResetUpdateTimeFlashsale = () => ({ 
  type: ActionTypes.RESET_UPDATE_TIME_FLASH_SALE,
});
