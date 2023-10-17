import { LOCATIONS } from 'constants/index';
import Layout from 'components/layout';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/notFoundPage';
import ProductList from 'pages/products';
import ProductDetail from 'pages/products/detail';
import CreateProduct from 'pages/products/createProduct';

export const routers = [
    //   { path: LOCATIONS.LOGIN, name: "Login Page", element: <Login /> },
    {
        path: LOCATIONS.HOME_PAGE,
        name: "Layout",
        element: < Layout / > ,
        children: [
             { isRoot: true, name: "Dashboard Page", element: < Dashboard / > },
             { path: LOCATIONS.DASHBOARD, name: "Not Found Page", element: <Dashboard / > },
             { path: LOCATIONS.PRODUCTS, name: "Product List", element: <ProductList/ > },
             { path: LOCATIONS.PRODUCT_DETAIL, name: "Product Detail", element: <ProductDetail/ > },
             { path: LOCATIONS.ADD_PRODUCT, name: "Product Detail", element: <CreateProduct/ > },
             { path: '*', name: "Not Found Page", element: <NotFoundPage / > }
        ]
    },
]