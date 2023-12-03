// Order List Page
// Created by Man Nguyen
// 19/10/2023

import OrderList from "components/orderList";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderListPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <OrderList />;
}

export default OrderListPage;
