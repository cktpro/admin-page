import CreateOrderOnline from "components/orderList/createOrderOnline";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrderOnlinePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <CreateOrderOnline />
    </div>
  )
}

export default CreateOrderOnlinePage