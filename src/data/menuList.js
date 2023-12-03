import { LOCATIONS } from "constants/index"
const menuList=[
    {
      label: "Dashboard",
      active: false,
      src: LOCATIONS.DASHBOARD,
      icon: require("assets/icon-slide/dashboard-svgrepo-com.png"),
    },
    {
      label: "Order",
      active: false,
      icon: require("assets/icon-slide/choices-order-svgrepo-com.png"),
      sub: [
        { label: "Order list", src: LOCATIONS.ORDER },
        {
          label: "Create order",
          src: LOCATIONS.CREATE_ORDER_ON,
        },
        {
          label: "Order statistics",
          src: LOCATIONS.ORDER_STATISTICS,
        },
      ],
    },
    {
      label: "Products",
      active: false,
      icon: require("assets/icon-slide/phone-svgrepo-com.png"),
      sub: [
        { label: "List of products", src: LOCATIONS.PRODUCTS },
        {
          label: "Product details",
          src: LOCATIONS.PRODUCT_DETAIL,
        },
        {
          label: "Add new Product",
          src: LOCATIONS.ADD_PRODUCT,
        },
        {
          label: "Create Flash Sale",
          src: LOCATIONS.CREATE_FLASH_SALE,
        },
      ],
    },
    {
      label: "Categories",
      active: false,
      icon: require("assets/icon-slide/category-management-svgrepo-com.png"),
      sub: [
        { label: "List of categories", src: LOCATIONS.CATEGORY },
        {
          label: "Add new category",
          src: LOCATIONS.ADD_CATEGORY,
        },
      ],
    },
    {
      label: "Supplier",
      active: false,
      icon: require("assets/icon-slide/category-management-svgrepo-com.png"),
      sub: [
        { label: "List of suppliers", src: LOCATIONS.SUPPLIER },
        {
          label: "Add new supplier",
          src: LOCATIONS.ADD_SUPPLIER,
        },
      ],
    },
    {
        label: "User",
        active: false,
        icon: require("assets/icon-slide/customer-service-help-svgrepo-com.png"),
        sub: [
          { label: "List", src: LOCATIONS.CUSTOMERS },
          {
            label: "Add user",
            src: LOCATIONS.ADD_CUSTOMER,
          },
          {
            label: "Update user",
            src: LOCATIONS.UPDATE_CUSTOMER,
          },
        ],
      },
    {
      label: "Notifications",
      active: false,
      icon: require("assets/icon-slide/notification-svgrepo-com.png"),
      src: LOCATIONS.MESSAGES,
    },
    {
      label: "Setting",
      active: false,
      icon: require("assets/icon-slide/setting-setting-svgrepo-com.png"),
      src: LOCATIONS.SETTING,
    },
    {
      label: "Sign Out",
      active: false,
      icon: require("assets/icon-slide/door-svgrepo-com.png"),
      src: LOCATIONS.SIGNOUT,
    },
  ]
  export default menuList