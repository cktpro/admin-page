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
      label: "Categories",
      active: false,
      icon: require("assets/icon-slide/category-management-svgrepo-com.png"),
      sub: [
        { label: "Danh sánh category", src: LOCATIONS.CATEGORY },
        {
          label: "Thêm mới category",
          src: LOCATIONS.ADD_CATEGORY,
        },
        {
          label: "Cập nhật category",
          src: LOCATIONS.UPDATE_CATEGORY,
        },
      ],
    },
    {
      label: "Nhà cung cấp",
      active: false,
      icon: require("assets/icon-slide/category-management-svgrepo-com.png"),
      sub: [
        { label: "Danh sánh nhà cung cấp", src: LOCATIONS.SUPPLIER },
        {
          label: "Thêm mới nhà cung cấp",
          src: LOCATIONS.ADD_SUPPLIER,
        },
      ],
    },
    {
        label: "Người dùng",
        active: false,
        icon: require("assets/icon-slide/customer-service-help-svgrepo-com.png"),
        sub: [
          { label: "List", src: LOCATIONS.CUSTOMERS },
          {
            label: "Thêm mới",
            src: LOCATIONS.ADD_CUSTOMER,
          },
          {
            label: "Cập nhật",
            src: LOCATIONS.UPDATE_CUSTOMER,
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