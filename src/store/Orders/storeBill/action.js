

import * as ActionTypes from './actionTypes';

export const actionGetBill = () => ({ 
  type: ActionTypes.GET_BILL,
});

export const actionAddBill = (payload) => ({ 
  type: ActionTypes.ADD_BILL,
  payload, 
});

export const actionDeleteBill= (payload) => ({ 
  type: ActionTypes.DELETE_BILL,
  payload, 
});

export const actionResetBill= () => ({ 
  type: ActionTypes.RESET_BILL,
});
