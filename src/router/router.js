import Layout from 'components/layout';
import { LOCATIONS } from 'constants/index';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/notFoundPage';
import OrderListPage from 'pages/ordersPage';
import ProductList from 'pages/products';
import CreateProduct from 'pages/products/createProduct';
import ProductDetail from 'pages/products/productDetail';
import UpdateProduct from 'pages/products/updateProduct';
import CreUpUser from 'pages/users/CreUpUser';
import UserList from 'pages/users';
import UserAccount from 'pages/users/UserAccount';


export const routers = [
    //   { path: LOCATIONS.LOGIN, name: "Login Page", element: <Login /> },
    {
        path: LOCATIONS.HOME_PAGE,
        name: "Layout",
        element: < Layout / > ,
        children: [
            { isRoot: true, name: "Dashboard Page", element: < Dashboard / > },
            { path: LOCATIONS.DASHBOARD, name: "Dashboard Page", element: < Dashboard / > },
            { path: LOCATIONS.ORDER, name: "Dashboard Page", element: < OrderListPage / > },
            { path: LOCATIONS.PRODUCTS, name: "Product List", element: < ProductList / > },
            { path: LOCATIONS.PRODUCT_DETAIL, name: "Product Detail", element: < ProductDetail / > },
            { path: LOCATIONS.ADD_PRODUCT, name: "Product Detail", element: < CreateProduct / > },
            { path: LOCATIONS.UPDATE_PRODUCT, name: "Product Update", element: < UpdateProduct / > },
            { path: LOCATIONS.ADD_USER, name: "Add User", element: < CreUpUser / > },
            { path: LOCATIONS.USER, name: "Userlist", element: < UserList / > },
            { path: LOCATIONS.UPDATE_USER, name: "Update User", element: < CreUpUser / > },
            { path: LOCATIONS.ACCOUNT_USER, name: "UserAccount", element: < UserAccount / > },
            { path: '*', name: "Not Found Page", element: < NotFoundPage / > }
        ]
    },
]