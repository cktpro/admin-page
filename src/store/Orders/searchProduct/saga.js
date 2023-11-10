

import searchProduct from 'api/orders/searchProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionSearchProductSuccess, actionSearchProductFailed } from './action';

function* doSearchProduct(action) {
    try {
      const response = yield searchProduct.searchProduct(action.payload);
  
      yield put(actionSearchProductSuccess(response));
    } catch (error) {
      yield put(actionSearchProductFailed(error));
    }
  }

  export default function* searchProductOrderSaga() {
    yield takeLeading(ActionTypes.SEARCH_PRODUCT, doSearchProduct);
  };
