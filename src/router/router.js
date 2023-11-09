import { LOCATIONS } from 'constants/index';
import Layout from 'components/layout';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/notFoundPage';
import ProductList from 'pages/products';
import ProductDetail from 'pages/products/productDetail';
import CreateProduct from 'pages/products/createProduct';
import OrderListPage from 'pages/ordersPage';
import UpdateProduct from 'pages/products/updateProduct';
import CategoryList from 'pages/categories';
import CreateCategory from 'pages/categories/createCategory';
import CategoryDetail from 'pages/categories/categoryDetail';

export const routers = [
    //   { path: LOCATIONS.LOGIN, name: "Login Page", element: <Login /> },
    {
        path: LOCATIONS.HOME_PAGE,
        name: "Layout",
        element: < Layout / > ,
        children: [
             { isRoot: true, name: "Dashboard Page", element: < Dashboard / > },
             { path: LOCATIONS.DASHBOARD, name: "Dashboard Page", element: <Dashboard / > },
             { path: LOCATIONS.ORDER, name: "Dashboard Page", element: <OrderListPage / > },
             { path: LOCATIONS.PRODUCTS, name: "Product List", element: <ProductList/ > },
             { path: LOCATIONS.PRODUCT_DETAIL, name: "Product Detail", element: <ProductDetail/ > },
             { path: LOCATIONS.ADD_PRODUCT, name: "Product Detail", element: <CreateProduct/ > },
             { path: LOCATIONS.UPDATE_PRODUCT, name: "Product Update", element: <UpdateProduct/ > },
            { path: LOCATIONS.ADD_CATEGORY, name: "Category Detail", element: <CreateCategory/>},
            { path: LOCATIONS.UPDATE_CATEGORY, name: "UCategory Detail", element: <CategoryDetail/>},
             { path: LOCATIONS.CATEGORY, name: "Category List", element: <CategoryList/ > },
             { path: '*', name: "Not Found Page", element: <NotFoundPage / > }
             
        ]
    },
]