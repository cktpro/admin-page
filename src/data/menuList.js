import { LOCATIONS } from "constants/index"
const menuList=[
    {
      label: "Dashboard",
      active: false,
      src: LOCATIONS.DASHBOARD,
      icon: require("assets/icon-slide/dashboard-svgrepo-com.png"),
    },
    {
      label: "Đơn Hàng",
      active: false,
      icon: require("assets/icon-slide/choices-order-svgrepo-com.png"),
      sub: [
        { label: "Danh sánh đơn hàng", src: LOCATIONS.ORDER },
        {
          label: "Chi tiết đơn hàng",
          src: LOCATIONS.ORDER_DETAIL,
        },
        {
          label: "Tạo đơn offline",
          src: LOCATIONS.CREATE_ORDER_OFF,
        },
        {
          label: "Tạo đơn trực tuyến",
          src: LOCATIONS.CREATE_ORDER_ON,
        },
      ],
    },
    {
      label: "Sản Phẩm",
      active: false,
      icon: require("assets/icon-slide/phone-svgrepo-com.png"),
      sub: [
        { label: "Danh sánh sản phẩm", src: LOCATIONS.PRODUCTS },
        {
          label: "Chi tiết sản phẩm",
          src: LOCATIONS.PRODUCT_DETAIL,
        },
        {
          label: "Thêm sản phẩm mới",
          src: LOCATIONS.ADD_PRODUCT,
        },
        {
          label: "Cập nhật sản phẩm",
          src: LOCATIONS.UPDATE_PRODUCT,
        },
      ],
    },
    {
      label: "Danh mục",
      active: false,
      icon: require("assets/icon-slide/category-management-svgrepo-com.png"),
      sub: [
        { label: "Danh sánh danh mục", src: LOCATIONS.CATEGORY },
        {
          label: "Thêm mới danh mục",
          src: LOCATIONS.ADD_CATEGORY,
        },
        {
          label: "Cập nhật danh mục",
          src: LOCATIONS.UPDATE_CATEGORY,
        },
      ],
    },
    {
        label: "Người dùng",
        active: false,
        icon: require("assets/icon-slide/customer-service-help-svgrepo-com.png"),
        sub: [
          { label: "List", src: LOCATIONS.CATEGORY },
          {
            label: "Thêm mới",
            src: LOCATIONS.ADD_CATEGORY,
          },
          {
            label: "Cập nhật",
            src: LOCATIONS.UPDATE_CATEGORY,
          },
        ],
      },
    {
      label: "Thông Báo",
      active: false,
      icon: require("assets/icon-slide/notification-svgrepo-com.png"),
      src: LOCATIONS.MESSAGES,
    },
    {
      label: "Cài Đặt",
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