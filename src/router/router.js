import { LOCATIONS } from 'constants/index';
import Layout from 'components/layout';
import Dashboard from 'pages/dashboard';

export const routers = [
    //   { path: LOCATIONS.LOGIN, name: "Login Page", element: <Login /> },
    {
        path: LOCATIONS.HOME_PAGE,
        name: "Layout",
        element: < Layout / > ,
        children: [
             { isRoot: true, name: "Dashboard Page", element: < Dashboard / > },
        ]
    },
]