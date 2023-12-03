// Order Detail Page
// Created by Man Nguyen
// 29/10/2023

import OrderDetail from "components/orderList/orderDetail";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderDetailPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <OrderDetail />;
}

export default OrderDetailPage;
