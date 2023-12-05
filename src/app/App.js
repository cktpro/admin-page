import { LOCATIONS } from "constants/index";
import React,{ useCallback, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { routers, unAuthRouter } from "router/router";

function App() {
  const navigate = useNavigate(); //khai báo sử dụng hàm chuyển trang
  
  const token = localStorage.getItem('TOKEN');
  
  useEffect(() => {
    if (!token){ //nếu không tồn tại token trên localStorage
      navigate(LOCATIONS.LOGIN); //chuyển hướng về trang login
    }
  }, [navigate, token]);

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
  };

  const renderRoutes = useCallback((routers) => {
    if (!token) { //router khi chưa đăng nhập
      return unAuthRouter.map((route, index) => {
        if (route.children && route.children.length > 0) {
          return (
            <Route path={route.path} element={route.element} key={index}>

              {renderRoutes(route.children)}

            </Route>
          );
        }

        if (route.isRoot) {
          return <Route index element={route.element} key={index} />
        }

        return <Route path={route.path} element={route.element} key={index} />;
      });
    }

    return routers.map((route, index) => { //router khi đã đăng nhập
      if (route.children && route.children.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>

            {renderRoutes(route.children)}

          </Route>
        );
      }

      if (route.isRoot) {
        return <Route index element={route.element} key={index} />
      }

      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, [token]);

  return <Routes>{renderRoutes(routers)}</Routes>;
}

export default App;