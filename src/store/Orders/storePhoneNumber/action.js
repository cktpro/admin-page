

import * as ActionTypes from './actionTypes';

export const actionGetPhoneNumber = () => ({ 
  type: ActionTypes.GET_PHONE_NUMBER,
});

export const actionAddPhoneNumber = (payload) => ({ 
  type: ActionTypes.ADD_PHONE_NUMBER,
  payload, 
});

export const actionDeletePhoneNumber= (payload) => ({ 
  type: ActionTypes.DELETE_PHONE_NUMBER,
  payload, 
});

export const actionResetPhoneNumber= () => ({ 
  type: ActionTypes.RESET_PHONE_NUMBER,
});
