import React, { useState } from "react";

import "./header.scss";
import { Link } from "react-router-dom";
import { handleSearch } from "api/productApi";
import { Input } from "antd";
function Footer(props) {
  const [isLoading, setIsLoading] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { children } = props;
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  
  function handleInputChange(e) {
    setKeyword(e.target.value)
}

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
          {/* <div className="search-bar" >
            <button className="search-logo" style={{ border: "none" }}>
              <img
                className="search-img"
                src={require("assets/icon-header/search-svgrepo-com.png")}
                alt=""
              />
            </button> */}
            <Input.Search
            value={keyword}
            onChange={handleInputChange}
            onSearch={handleSearch}
              className="search-input"
              type="text"
              placeholder="Type anything for me..."
              enterButton/>
          {/* </div> */}
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
                <b>Kim Trầm</b>
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
              <li>
                <Link>My Profile</Link>
              </li>
              <li>
                <Link>Setting</Link>
              </li>
              <li>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
