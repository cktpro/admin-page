// declare redux
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo rootReducer */
import { combineReducers } from 'redux';

//order-------------------------------------------------------------------------//
import orderReducer from './Orders/getOrderList/reducer';
import orderCompletedReducer from './Orders/getOrderListCompleted/reducer';
import orderWaitingReducer from './Orders/getOrderListWaiting/reducer';
import orderCanceledReducer from './Orders/getOrderListCanceled/reducer';
import orderRejectedReducer from './Orders/getOrderListRejected/reducer';
import orderDeliveringReducer from './Orders/getOrderListDelivering/reducer';

import getNumOfOrdersStatusReducer from './Orders/getNumOfStatus/reducer';

import searchOrdersReducer from './Orders/searchOrders/reducer';

import getOrderDetailReducer from './Orders/getOrderDetail/reducer';

import searchCustomerOrderReducer from './Orders/searchCustomer/reducer';
import searchProductToCreateOrderReducer from './Orders/searchProduct/reducer';

import storeProductsArrayReducer from './Orders/storeProductsArray/reducer';
import storeCustomerReducer from './Orders/storeCustomer/reducer';
import storePhoneNumberReducer from './Orders/storePhoneNumber/reducer';
import createCustomerOrderReducer from './Orders/createCustomerOrder/reducer';
import getReceiveProvinceReducer from './Orders/getReceiveProvince/reducer';
import getReceiveDistrictReducer from './Orders/getReceiveDistrict/reducer';
import getReceiveWardReducer from './Orders/getReceiveWard/reducer';
import getShippingFeeReducer from './Orders/getShippingFee/reducer';
import storeAddressReducer from './Orders/storeAddress/reducer';
import createOrderReducer from './Orders/createOrder/reducer';

import createOrderDetailsReducer from './Orders/createOrderDetails/reducer';
import userReducer from './User/reducer';

//---------------------------------------------------------------------------//

const rootReducer = combineReducers({

  //order-------------------------------------------------------------------------//
  orderReducer,
  orderCompletedReducer,
  orderWaitingReducer,
  orderCanceledReducer,
  orderRejectedReducer,
  orderDeliveringReducer,

  getNumOfOrdersStatusReducer,

  searchOrdersReducer,

  getOrderDetailReducer,

  searchCustomerOrderReducer,

  searchProductToCreateOrderReducer,


  storeProductsArrayReducer,
  storeCustomerReducer,
  storePhoneNumberReducer,
  createCustomerOrderReducer,
  getReceiveProvinceReducer,
  getReceiveDistrictReducer,
  getReceiveWardReducer,
  getShippingFeeReducer,
  storeAddressReducer,
  createOrderReducer,
  //----------------------------------------------------------------------------------//


  createOrderDetailsReducer,
  userReducer ,
  //------------------------------------------//

});

export default rootReducer;
