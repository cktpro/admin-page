import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./return.module.scss";
import { LOCATIONS } from "constants/index";
import PathDot from "components/svg/pathDot";
import { Button, InputNumber, notification } from "antd";
import { actionResetOrderDetailList } from "store/Orders/storeProductsArray/action";
import { actionResetPhoneNumber } from "store/Orders/storePhoneNumber/action";
import { actionResetCustomer } from "store/Orders/storeCustomer/action";
import { actionResetAddress } from "store/Orders/storeAddress/action";
import { actionResetCreateOrder } from "store/Orders/createOrder/action";
import { actionResetBill } from "store/Orders/storeBill/action";

import "./checkout.scss";

function CheckoutCashPage() {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [amount, setAmount] = useState(0);

  const [surplusMoney, setSurplusMoney] = useState(0);

  const [isErrorAmount, setIsErrorAmount] = useState(false);

  const [isHaveRes, setIsHaveRes] = useState(false);

  const dispatch = useDispatch();

  const getBill = useSelector((state) => state.storeBillReducer.payload);

  const changeAmount = useCallback(
    (value) => {
      setIsErrorAmount(false);

      setAmount(parseFloat(value));

      setSurplusMoney(
        (parseFloat(value) - parseFloat(getBill?.total?.toFixed(2))).toFixed(2)
      );
    },
    [getBill?.total]
  );

  useEffect(() => {
    if (isNaN(surplusMoney)) {
      setSurplusMoney("0.00");
    }
  }, [surplusMoney]);

  const openNotificationWithIcon = useCallback(
    (type, message) => {
      switch (type) {
        case "error":
          api[type]({
            message: "ERROR",
            description: message,
          });
          break;

        case "success":
          api[type]({
            message: "SUCCESS",
            description: message,
          });
          break;

        default:
          break;
      }
    },
    [api]
  );

  const onFinish = useCallback(() => {
    if (!amount || amount <= 0 || amount < getBill?.total) {
      setIsErrorAmount(true);

      openNotificationWithIcon(
        "error",
        "Please enter the complete and exact amount"
      );

      return;
    }

    setIsHaveRes(true);
  }, [amount, getBill?.total, openNotificationWithIcon]);

  return (
    <>
      {contextHolder}

      {isHaveRes && (
        <div className={styles.is_have_res}>
          <div className={styles.res_info}>
            <span className={styles.res_message}>Payment success</span>

            <Button
              className={styles.btn_ok}
              type="primary"
              htmlType="button"
              onClick={() => {
                navigate(LOCATIONS.CREATE_ORDER_ON);
                dispatch(actionResetOrderDetailList());
                dispatch(actionResetPhoneNumber());
                dispatch(actionResetCustomer());
                dispatch(actionResetCustomer());
                dispatch(actionResetAddress());
                dispatch(actionResetCreateOrder());
                dispatch(actionResetBill());
                setIsHaveRes(false);
              }}
            >
              <span className={styles.ok}>BACK TO CREATE ORDER</span>
            </Button>
          </div>
        </div>
      )}

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
            className={`col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 ${styles.custom_col} ${styles.cover_product}`}
          >
            <div className={styles.products}>
              <h4 className={styles.title_products}>Checkout Information</h4>

              <div className={styles.products_details}>
                <div className={styles.cover_bill_info}>
                  <div className={styles.cover_provisional_total}>
                    <span className={styles.provisional_total_title}>
                      Sub Total
                    </span>

                    <span className={styles.provisional_total}>
                      ${getBill?.temp?.toFixed(2)}
                    </span>
                  </div>

                  <div className={styles.cover_shipping}>
                    <span className={styles.shipping_title}>Shipping</span>

                    <span className={styles.shipping}>
                      ${getBill?.shipping?.toFixed(2)}
                    </span>
                  </div>

                  <div className={styles.cover_total_}>
                    <span className={styles.total_title}>Total</span>

                    <span className={styles.total}>
                      ${getBill?.total?.toFixed(2)}
                    </span>
                  </div>

                  <div className={styles.cover_total}>
                    <span className={styles.total_title}>
                      Money received from customers
                    </span>

                    <div
                      className={
                        isErrorAmount ? styles.cover_error : styles.cover_amount
                      }
                    >
                      <div className="amount">
                        <InputNumber
                          style={{
                            width: 200,
                            textAlign: "end",
                          }}
                          min={0}
                          onChange={changeAmount}
                          controls={false}
                          placeholder="Type the amount"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.cover_total}>
                    <span className={styles.total_title}>Surplus money</span>

                    <span className={styles.total}>${surplusMoney}</span>
                  </div>
                </div>

                <div className={styles.cover_btn_create_order}>
                  <Button
                    onClick={() => onFinish()}
                    className={styles.btn_create_order}
                    type="primary"
                    htmlType="button"
                  >
                    <span className={styles.create_order}>MAKE PAYMENTS</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutCashPage;
