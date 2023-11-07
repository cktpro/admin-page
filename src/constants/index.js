export const LOCATIONS = {
    HOME_PAGE: "/",
    DASHBOARD: "/dashboard",
    ORDER: "/order",
    ORDER_DETAIL: "/order_detail",
    CREATE_ORDER_OFF: "/create_order_offline",
    CREATE_ORDER_ON: "/create_order_online",
    PRODUCTS: "/products",
    PRODUCT_DETAIL: "/product_detail/:id",
    ADD_PRODUCT: "/add_product",
    UPDATE_PRODUCT: "/update_product/:id",
    CATEGORY: "/categories",
    ADD_CATEGORY: "/add_category",
    UPDATE_CATEGORY: "/update_category",
    SETTING: "/setting",
    MESSAGES: "/messages",
    SIGNOUT: "/singout",
    USER: "/users",
    USER_DETAIL: "/user_detail",
    ADD_USER: "/add_user",
    UPDATE_USER: "/update_user",
    USER: '/user',
    ACCOUNT_USER: '/account_user',
    CREATE_USER_OFF: "/create_user_offline",
    CREATE_USER_ON: "/create_user_online",

};

// pageSize pagination of orders
// Created by Man Nguyen
// 19/10/2023
export const pageSize = 20;

// listStatus of orders status menu
// Created by Man Nguyen
// 19/10/2023
export const listStatus = [
    "WAITING",
    "COMPLETED",
    "CANCELED",
    "REJECTED",
    "DELIVERING",
];