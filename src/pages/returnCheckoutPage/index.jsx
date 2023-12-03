import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { actionCheckIpnVnpay } from "store/Orders/checkIpnVnpay/action";
import { actionCheckReturnVnpay } from "store/Orders/checkReturnVnpay/action";
import styles from "./return.module.scss";
import { LOCATIONS } from "constants/index";
import PathDot from "components/svg/pathDot";
import { Button } from "antd";

function ReturnCheckoutPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const checkReturnVnpay = useSelector(
    (state) => state.checkReturnVnpayReducer.payload.statusCode
  );

  useEffect(() => {
    const data = {
      vnp_Amount: searchParams.get("vnp_Amount"),
      vnp_BankCode: searchParams.get("vnp_BankCode"),
      vnp_BankTranNo: searchParams.get("vnp_BankTranNo"),
      vnp_CardType: searchParams.get("vnp_CardType"),
      vnp_OrderInfo: searchParams.get("vnp_OrderInfo"),
      vnp_PayDate: searchParams.get("vnp_PayDate"),
      vnp_ResponseCode: searchParams.get("vnp_ResponseCode"),
      vnp_TmnCode: searchParams.get("vnp_TmnCode"),
      vnp_TransactionNo: searchParams.get("vnp_TransactionNo"),
      vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus"),
      vnp_TxnRef: searchParams.get("vnp_TxnRef"),
      vnp_SecureHash: searchParams.get("vnp_SecureHash"),
      orderIdLocal: localStorage.getItem("orderId") || "",
    };

    if (data.vnp_BankTranNo === null) {
      delete data.vnp_BankTranNo;
    }

    if (data.vnp_Amount !== null) {
      dispatch(actionCheckReturnVnpay(data));

      dispatch(actionCheckIpnVnpay(data));

      localStorage.removeItem("orderId");
    }
  }, [dispatch, searchParams]);

  const onBack = useCallback(() => {
    navigate(LOCATIONS.CREATE_ORDER_ON);
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className={`row ${styles.custom_row}`}>
        <div className={`col-12 ${styles.custom_col}`}>
          <h4 className={styles.title_create_order_online}>Checkout</h4>
        </div>

        <div className="col-12 custom_col order_list_path">
          <span className="order_list_path_dashboard">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={LOCATIONS.DASHBOARD}
            >
              Dashboard
            </Link>
          </span>

          <span className="order_list_path_dot">
            <PathDot />
          </span>

          <span className="order_list_path_order">Checkout</span>
        </div>
      </div>

      <div className={`row ${styles.custom_row}`}>
        <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${styles.custom_col} ${styles.cover_product}`}
        >
          <div className={styles.products}>
            <h4 className={styles.title_products}>Checkout Information</h4>

            <div className={styles.products_details}>
              {checkReturnVnpay?.toString() === "24" && (
                <span className={styles.success}>
                  Payment failed, please try again!
                </span>
              )}

              {checkReturnVnpay?.toString() === "97" && (
                <span className={styles.failed}>illegal transactions!</span>
              )}

              {checkReturnVnpay?.toString() === "00" && (
                <span className={styles.failed}>
                  Payment successful, thank you!
                </span>
              )}

              <div className={styles.cover_btn_create_order}>
                <Button
                  onClick={() => onBack()}
                  className={styles.btn_create_order}
                  type="primary"
                  htmlType="button"
                >
                  <span className={styles.create_order}>
                    BACK TO CREATE ORDER
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="">
    //   {checkReturnVnpay?.toString() === "24" && (
    //     <span className="">Payment failed, please try again!</span>
    //   )}

    //   {checkReturnVnpay?.toString() === "97" && (
    //     <span className="">illegal transactions!</span>
    //   )}

    //   {checkReturnVnpay?.toString() === "00" && (
    //     <span className="">Payment successful, thank you!</span>
    //   )}

    //   <Link to="/create_order_online" className="">
    //     Back to create order
    //   </Link>
    // </div>
  );
}

export default ReturnCheckoutPage;
