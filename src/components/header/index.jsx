import React, { useCallback, useEffect, useState } from "react";

import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
function Footer(props) {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false);
  const { children } = props;

  const [user, setUser] = useState("");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("REFRESH_TOKEN")

    navigate("/login")
  }, [navigate]);

  const getMe = useCallback(async () => {
    try {
      const res = await axiosAdmin.get("/authEmployees/profile")

      setUser(res.data.payload.fullName)
    } catch (error) {
      console.log('««««« error.response.data »»»»»', error.response.data);
    }
  }, []);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="header">
      <div className="d-flex h-100 justify-content-between align-items-center px-2">
        {/* Logo header */}
        <div className="logo-header d-flex align-items-center gap-2">
          <div>{children}</div>
          <Link>
            <img
              className="logo-header-img"
              src={require("assets/icon-header/shop-store-svgrepo-com.png")}
              alt=""
            />
          </Link>
          <Link>
            <h2 className="brand-header mb-1">E-Shop</h2>
          </Link>
        </div>
        {/* Right header */}
        <div className=" d-flex justify-content-end align-items-center gap-4 mx-1">
          <div className="search-bar" >
            <button className="search-logo" style={{ border: "none" }}>
              <img
                className="search-img"
                src={require("assets/icon-header/search-svgrepo-com.png")}
                alt=""
              />
            </button>
            <input
              className="search-input"
              type="text"
              placeholder="Type anything for me..."
            />
          </div>
          <div className="notification">
            <img
              className="noti-img"
              src={require("assets/icon-slide/notification-svgrepo-com.png")}
              alt=""
            />
            <span className="badge">4</span>
          </div>
          <div
            onClick={() => setIsActive((prev) => !prev)}
            className="account-header d-flex gap-2 align-items-center"
          >
            <img
              className="avatar-account"
              src={require("assets/images/avatar-header.jpg")}
              alt=""
            />
            <div className="account-info">
              <p  className="user-name m-0">
                <b>{user}</b>
              </p>
              <p className="user-role m-0">Admin</p>
            </div>
            <img
              className="drop-down-header"
              src={require("assets/icon-slide/arrow-down-svgrepo-com.png")}
              alt=""
            />
            <ul
              className={`${
                !isActive ? "d-none" : ""
              } sub-menu-account list-unstyled`}
            >
              {/* <li>
                <Link>My Profile</Link>
              </li>
              <li>
                <Link>Setting</Link>
              </li> */}
              <li onClick={() => handleLogout()}>
                <Link >Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
