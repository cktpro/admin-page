import { LOCATIONS } from 'constants/index';
import Layout from 'components/layout';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/notFoundPage';
import ProductList from 'pages/products';
import ProductDetail from 'pages/products/productDetail';
import CreateProduct from 'pages/products/createProduct';
import OrderListPage from 'pages/ordersPage';
import UpdateProduct from 'pages/products/updateProduct';
import OrderDetailPage from 'pages/ordersPage/orderDetailPage';
import CreateOrderOnlinePage from 'pages/ordersPage/createOrderOnline';

import CheckoutPage from 'pages/checkoutPage';

import CreateCategory from 'pages/categories/createCategory';
import CategoryDetail from 'pages/categories/updateCategory/categoryDetail';
import CategoryList from 'pages/categories';
import Users from 'pages/customers';
import CreUpUser from 'pages/customers/CreUpUser';
import CreateSupplier from 'pages/suppliers/createSupplier';
import UpdateSupplier from 'pages/suppliers/updateSupplier';
import SupplierList from 'pages/suppliers';

export const routers = [
    //   { path: LOCATIONS.LOGIN, name: "Login Page", element: <Login /> },
    {
        path: LOCATIONS.HOME_PAGE,
        name: "Layout",
        element: < Layout />,
        children: [
            { isRoot: true, name: "Dashboard Page", element: < Dashboard /> },
            { path: LOCATIONS.DASHBOARD, name: "Dashboard Page", element: <Dashboard /> },
            { path: LOCATIONS.ORDER, name: "Orders", element: <OrderListPage /> },
            { path: LOCATIONS.ORDER_DETAIL, name: "Order Detail", element: <OrderDetailPage /> },
            { path: LOCATIONS.CREATE_ORDER_ON, name: "Create Order Online", element: <CreateOrderOnlinePage /> },
            { path: LOCATIONS.CHECKOUT, name: "Checkout", element: <CheckoutPage /> },
            { path: LOCATIONS.PRODUCTS, name: "Product List", element: <ProductList /> },
            { path: LOCATIONS.PRODUCT_DETAIL, name: "Product Detail", element: <ProductDetail /> },
            { path: LOCATIONS.ADD_PRODUCT, name: "Product Detail", element: <CreateProduct /> },
            { path: LOCATIONS.UPDATE_PRODUCT, name: "Product Update", element: <UpdateProduct /> },
            { path: LOCATIONS.CUSTOMERS, name: "Add User", element: <Users/ > },
            { path: LOCATIONS.ADD_CUSTOMER, name: "Add User", element: <CreUpUser/ > },
            { path: LOCATIONS.UPDATE_CUSTOMER, name: "Update User", element: <CreUpUser/ > },
            {
              path: LOCATIONS.ADD_CATEGORY,
              name: "Category Detail",
              element: <CreateCategory />,
            },
            {
              path: LOCATIONS.UPDATE_CATEGORY,
              name: "Category Detail",
              element: <CategoryDetail />,
            },
            {
              path: LOCATIONS.CATEGORY,
              name: "Category List",
              element: <CategoryList />,
            },
            {
              path: LOCATIONS.ADD_SUPPLIER,
              name: "Add Supplier",
              element: <CreateSupplier />,
            },
            {
              path: LOCATIONS.UPDATE_SUPPLIER,
              name: "Supplier Detail",
              element: <UpdateSupplier />,
            },
            {
              path: LOCATIONS.SUPPLIER,
              name: "Supplier List",
              element: <SupplierList />,
            },
            { path: '*', name: "Not Found Page", element: <NotFoundPage /> }

        ]
    },
]