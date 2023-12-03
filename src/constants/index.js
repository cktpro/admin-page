export const LOCATIONS = {
  HOME_PAGE: "/",
  DASHBOARD: "/dashboard",
  ORDER: "/order",
  ORDER_DETAIL: '/order/:id',
  CREATE_ORDER_OFF: '/create_order_offline',
  CREATE_ORDER_ON: '/create_order_online',
  ORDER_STATISTICS: '/order_statistics',
  CHECKOUT: '/checkout',
  RETURN_CHECKOUT: '/return_checkout',
  CHECKOUT_CASH: '/checkout_cash',
  PRODUCTS: "/products",
  PRODUCT_DETAIL: '/product_detail/:id',
  ADD_PRODUCT: '/add_product',
  UPDATE_PRODUCT: '/update_product/:id',
  CREATE_FLASH_SALE: '/create_flash_sale',
  CATEGORY: "/categories/",
  ADD_CATEGORY: '/add_category',
  UPDATE_CATEGORY: '/categories/:id',
  SUPPLIER: "/suppliers",
  ADD_SUPPLIER: '/add_supplier',
  UPDATE_SUPPLIER: '/suppliers/:id',
  SETTING: '/setting',
  MESSAGES: '/messages',
  SIGNOUT: '/singout',
  CUSTOMERS: "/customers",
  ADD_CUSTOMER: "/add_customer",
  UPDATE_CUSTOMER: "/update_customer/:id",
};

// pageSize pagination of orders
// Created by Man Nguyen
// 19/10/2023
export const pageSize = 20;

// listStatus of orders status menu 
// Created by Man Nguyen
// 19/10/2023
export const listStatus = ['WAITING', 'COMPLETED', 'CANCELED', 'REJECTED', 'DELIVERING'];

// district code send
// Created by Man Nguyen
// 11/11/2023
export const districtCodeSend = 1526;
