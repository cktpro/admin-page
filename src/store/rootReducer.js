// declare redux
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo rootReducer */
import { combineReducers } from 'redux';

//Create Flashsale-------------------------------------------------------------------------//

import storeProductsFlashsaleReducer from './Products/CreateFlashsale/storeProductsArray/reducer';
import updateFlashsaleReducer from './Products/CreateFlashsale/updateFlashsale/reducer';
import deleteAllFlashsaleReducer from './Products/CreateFlashsale/deleteAllFlashsale/reducer';
import updateTimeFlashsaleReducer from './Products/CreateFlashsale/updateTimeFlashsale/reducer';
import getTimeFlashsaleReducer from './Products/CreateFlashsale/getTimeFlashsale/reducer';

//---------------------------------------------------------------------------//

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
import storeBillReducer from './Orders/storeBill/reducer';
import createCustomerOrderReducer from './Orders/createCustomerOrder/reducer';
import getReceiveProvinceReducer from './Orders/getReceiveProvince/reducer';
import getReceiveDistrictReducer from './Orders/getReceiveDistrict/reducer';
import getReceiveWardReducer from './Orders/getReceiveWard/reducer';
import getShippingFeeReducer from './Orders/getShippingFee/reducer';
import storeAddressReducer from './Orders/storeAddress/reducer';
import createOrderReducer from './Orders/createOrder/reducer';
import CheckoutVnpayReducer from './Orders/checkoutVnpay/reducer';
import checkReturnVnpayReducer from './Orders/checkReturnVnpay/reducer';
import checkIpnVnpayReducer from './Orders/checkIpnVnpay/reducer';


//---------------------------------------------------------------------------//

import userReducer from './User/reducer';

const rootReducer = combineReducers({

  //Create Flashsale-------------------------------------------------------------------------//
  storeProductsFlashsaleReducer,
  updateFlashsaleReducer,
  deleteAllFlashsaleReducer,
  updateTimeFlashsaleReducer,
  getTimeFlashsaleReducer,
  //---------------------------------------------------------------------------//

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
  storeBillReducer,
  createCustomerOrderReducer,
  getReceiveProvinceReducer,
  getReceiveDistrictReducer,
  getReceiveWardReducer,
  getShippingFeeReducer,
  storeAddressReducer,
  createOrderReducer,
  CheckoutVnpayReducer,
  checkReturnVnpayReducer,
  checkIpnVnpayReducer,
  //----------------------------------------------------------------------------------//

  userReducer,
  //------------------------------------------//

});

export default rootReducer;
