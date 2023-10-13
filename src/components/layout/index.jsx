import React from "react";
import Header from "components/header";
import { Outlet } from "react-router-dom";
import Footer from "components/footer";
import Slide from "components/slide";
// import styles
import "./layout.css";
function Layout(props) {
  return (
    <div className="d-flex flex-row">
      <div>
        <Slide />r
      </div>

      <div className="w-100 flex-column">
        <div>
          <Header />
        </div>
        <div>
          <main className="layout m-2">
            <Outlet />
            <Footer />
          </main>
          
        </div>
      </div>
      {/* <Header />
      <main>
        <Slide/>
      <Outlet />
      </main>
      <Footer /> */}
    </div>
  );
}

export default Layout;
