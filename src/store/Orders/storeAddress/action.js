

import * as ActionTypes from './actionTypes';

export const actionGetAddress = () => ({ 
  type: ActionTypes.GET_ADDRESS,
});

export const actionAddAddress = (payload) => ({ 
  type: ActionTypes.ADD_ADDRESS,
  payload, 
});

export const actionDeleteAddress= (payload) => ({ 
  type: ActionTypes.DELETE_ADDRESS,
  payload, 
});

export const actionResetAddress= () => ({ 
  type: ActionTypes.RESET_ADDRESS,
});
