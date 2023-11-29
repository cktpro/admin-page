

import * as ActionTypes from './actionTypes';

export const actionGetCustomer = () => ({ 
  type: ActionTypes.GET_CUSTOMER,
});

export const actionAddCustomer = (payload) => ({ 
  type: ActionTypes.ADD_CUSTOMER,
  payload, 
});

export const actionDeleteCustomer = (payload) => ({ 
  type: ActionTypes.DELETE_CUSTOMER,
  payload, 
});

export const actionResetCustomer = () => ({ 
  type: ActionTypes.RESET_CUSTOMER,
});
