import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Radio,
  Table,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import PathDot from "components/svg/pathDot";
import { LOCATIONS } from "constants/index";
import { actionResetsearchCustomer } from "store/Orders/searchCustomer/action";
import styles from "./checkout.module.scss";
import { actionResetOrderDetailList } from "store/Orders/storeProductsArray/action";
import { actionResetCustomer } from "store/Orders/storeCustomer/action";
import { actionResetAddress } from "store/Orders/storeAddress/action";
import { actionResetCreateOrder } from "store/Orders/createOrder/action";
import EditIcon from "components/svg/edit";
import ClearIcon from "components/svg/clear";
import { actionResetSearchProduct } from "store/Orders/searchProduct/action";
import Loading from "components/svg/loading";
import { actionResetPhoneNumber } from "store/Orders/storePhoneNumber/action";
import { actionCheckoutVnpay } from "store/Orders/checkoutVnpay/action";
import { actionAddBill } from "store/Orders/storeBill/action";

function CheckoutPage() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const [createCustomerFrom] = Form.useForm();

  const [searchCustomerFrom] = Form.useForm();

  const [addShippingAddressFrom] = Form.useForm();

  const [searchProductFrom] = Form.useForm();

  const refInputChangeQuantity = useRef(null);

  const [paymentType, setPaymentType] = useState("");

  const [isOpenModalSearchProduct, setIsOpenModalSearchProduct] =
    useState(false);

  const [isOpenModalEditQuantity, setIsOpenModalEditQuantity] = useState(false);

  const [isOpenModalShippingAddress, setIsOpenModalShippingAddress] =
    useState(false);

  const [isOpenModalSearchCustomer, setIsOpenModalSearchCustomer] =
    useState(false);

  const [isOpenModalCreateCustomer, setIsOpenModalCreateCustomer] =
    useState(false);

  const [isErrorProduct, setIsErrorProduct] = useState(false);

  const [isErrorQuantityProduct, setIsErrorQuantityProduct] = useState(false);

  const [isErrorCustomer, setIsErrorCustomer] = useState(false);

  const [inputChangeQuantity, setInputChangeQuantity] = useState(0);

  const [productEdit, setProductEdit] = useState({});

  const [temp, setTemp] = useState(0);

  const [shipping, setShipping] = useState(0);

  const [total, setTotal] = useState(0);

  const [isHaveRes, setIsHaveRes] = useState(false);

  const orderDetailsList = useSelector(
    (state) => state.storeProductsArrayReducer.payload
  );

  const customerDetails = useSelector(
    (state) => state.storeCustomerReducer.payload
  );

  const createCustomerOrder = useSelector(
    (state) => state.createCustomerOrderReducer.payload
  );

  const getShippingAddress = useSelector(
    (state) => state.storeAddressReducer.payload
  );

  const getCheckoutVnpay = useSelector(
    (state) => state.CheckoutVnpayReducer.payload
  );

  useEffect(() => {
    console.log("««««« getCheckoutVnpay »»»»»", getCheckoutVnpay);
  }, [getCheckoutVnpay]);

  const isLoading = useSelector((state) => state.createOrderReducer.isLoading);

  const resCreateOrder = useSelector(
    (state) => state.createOrderReducer.payload
  );

  useEffect(() => {
    if (Object.keys(getShippingAddress).length > 0) {
      setShipping(
        parseFloat((getShippingAddress?.shippingFee / 24000).toFixed(2))
      );
    } else {
      setShipping(0);
    }
  }, [getShippingAddress]);

  const handleClickChangeQuantity = useCallback((product) => {
    setIsOpenModalEditQuantity(true);

    setProductEdit(product);

    setInputChangeQuantity(product.quantity);
  }, []);

  useEffect(() => {
    if (isOpenModalEditQuantity) {
      refInputChangeQuantity.current.value = productEdit.quantity;
    }
  }, [isOpenModalEditQuantity, productEdit.quantity]);

  const calBilling = useCallback(() => {
    let sum = 0;

    orderDetailsList.forEach((item) => {
      sum =
        sum +
        (parseInt(item.quantity) *
          parseInt(item.price) *
          (100 - parseInt(item.discount))) /
          100;
    });

    setTemp(sum);
    setTotal(sum + shipping);
  }, [orderDetailsList, shipping]);

  useEffect(() => {
    if (orderDetailsList.length === 0) {
      setTemp(0);
      // setShipping(0);
      setTotal(0);
    }

    if (orderDetailsList.length > 0) {
      calBilling();
    }
  }, [calBilling, orderDetailsList]);

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

  useEffect(() => {
    if (Object.keys(customerDetails).length > 0) {
      setIsOpenModalSearchCustomer(false);
    }
  }, [customerDetails]);

  useEffect(() => {
    if (Object.keys(getShippingAddress).length > 0) {
      setIsOpenModalShippingAddress(false);
    }
  }, [getShippingAddress]);

  useEffect(() => {
    const filterErrorProduct = orderDetailsList.filter((item) => {
      return item.quantity > item.stock || item.quantity <= 0;
    });

    if (filterErrorProduct.length > 0) {
      setIsErrorQuantityProduct(true);
    } else {
      setIsErrorProduct(false);
      setIsErrorQuantityProduct(false);
    }
  }, [orderDetailsList]);

  useEffect(() => {
    if (getCheckoutVnpay?.url) {
      window.location.replace(getCheckoutVnpay?.url);
    }
  }, [getCheckoutVnpay?.url, navigate]);

  const clickCheckout = useCallback(() => {
    if (paymentType === "CASH") {
      const data = {
        temp,
        shipping,
        total,
      };

      dispatch(actionAddBill(data));

      navigate(LOCATIONS.CHECKOUT_CASH);
    } else {
      const data = {
        amount: total.toFixed(2) * 24000,
        bankCode: "NCB",
        language: "en",
        returnUrl: process.env.REACT_APP_VNPAY_RETURN_URL,
      };

      dispatch(actionCheckoutVnpay(data));
      
      // dispatch(actionResetOrderDetailList());
      // dispatch(actionResetPhoneNumber());
      // dispatch(actionResetCustomer());
      // dispatch(actionResetCustomer());
      // dispatch(actionResetAddress());
      // dispatch(actionResetCreateOrder());
      setIsHaveRes(false);
    }
  }, [dispatch, navigate, paymentType, total]);

  const onChangePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  const columns = [
    {
      // width: "10%",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return (
          <div className={styles.cover_product_name}>
            <img className={styles.product_img} src={record.image} alt="..." />

            <span className={styles.product_name}>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => {
        if (record.quantity > record.stock || record.quantity <= 0) {
          return (
            <div className={styles.cover_quantity_error}>
              <span className={styles.product_quantity}>{text}</span>

              <button
                onClick={() => handleClickChangeQuantity(record)}
                className={styles.btn_quantity_edit}
              >
                <EditIcon />
              </button>
            </div>
          );
        }

        return (
          <div className={styles.cover_quantity}>
            <span className={styles.product_quantity}>{text}</span>

            <button
              onClick={() => handleClickChangeQuantity(record)}
              className={styles.btn_quantity_edit}
            >
              <EditIcon />
            </button>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return (
          // <span className={styles.price}>${numeral(text).format("0,0")}</span>
          <span className={styles.price}>${text.toFixed(2)}</span>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text, record, index) => {
        return <span className={styles.discount}>{text}%</span>;
      },
    },
    {
      title: "Discounted Price",
      // dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text, record, index) => {
        return (
          <span className={styles.discounted_price}>
            $
            {(
              (record.quantity * record.price * (100 - record.discount)) /
              100
            ).toFixed(2)}
          </span>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}

      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}

      {isHaveRes && (
        <div className={styles.is_have_res}>
          <div className={styles.res_info}>
            <span className={styles.res_message}>
              {resCreateOrder?.message}
            </span>

            <Button
              className={styles.btn_ok}
              type="primary"
              htmlType="button"
              onClick={() => {
                navigate(LOCATIONS.CHECKOUT);
              }}
            >
              <span className={styles.ok}>Go to checkout</span>
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
            <div
              className={
                isErrorProduct ? styles.products_error : styles.products
              }
            >
              <h4 className={styles.title_products}>Products</h4>

              <div className={styles.products_details}>
                <Table
                  rowKey="productId"
                  columns={columns}
                  dataSource={orderDetailsList}
                  pagination={false}
                />
              </div>
            </div>

            <div className={styles.billing_information}>
              <h4 className={styles.title_billing_information}>
                Billing Information
              </h4>

              <div className={styles.cover_bill_info}>
                <div className={styles.cover_provisional_total}>
                  <span className={styles.provisional_total_title}>
                    Sub Total
                  </span>

                  <span className={styles.provisional_total}>
                    ${temp.toFixed(2)}
                  </span>
                </div>

                <div className={styles.cover_shipping}>
                  <span className={styles.shipping_title}>Shipping</span>

                  <span className={styles.shipping}>
                    {/* ${numeral((shipping/24000).toFixed(2)).format("0,0")} */}
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <div className={styles.cover_total}>
                  <span className={styles.total_title}>Total</span>

                  <span className={styles.total}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ${styles.custom_col}`}
          >
            <div
              className={
                isErrorCustomer ? styles.customer_error : styles.customer
              }
            >
              <h4 className={styles.title_customer}>Customer</h4>

              <div className={styles.cover_customer_detail}>
                {Object.keys(customerDetails).length > 0 && (
                  <>
                    <div className={styles.avatar_customer_detail}>
                      <div className={styles.avatar}>
                        <img
                          className={styles.avatar_img}
                          src={require("assets/images/avatar_2.jpg")}
                          alt="..."
                        />
                      </div>

                      <div className={styles.customer_detail}>
                        <span className={styles.customer_name}>
                          {customerDetails.fullName}
                        </span>

                        <span className={styles.phoneNumber}>
                          {customerDetails.phoneNumber}
                        </span>

                        <span className={styles.email}>
                          {customerDetails.email}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.shipping_address}>
              <h4 className={styles.title_shipping_address}>
                Shipping Address
              </h4>

              <div className={styles.cover_shipping_address_detail}>
                {Object.keys(getShippingAddress).length > 0 && (
                  <>
                    <div className={styles.shipping_detail}>
                      <span className={styles.shipping_name}>
                        {getShippingAddress.address}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.shipping_address}>
              <h4 className={styles.title_shipping_address}>Payment Type</h4>

              <div className={styles.cover_shipping_address_detail}>
                <Radio.Group
                  onChange={(e) => onChangePaymentType(e)}
                  value={paymentType}
                >
                  <Radio value={"CASH"}>
                    <span className={styles.payment_type}>CASH</span>
                  </Radio>
                  <Radio value={"CREDIT CARD"}>
                    <span className={styles.payment_type}>CREDIT CARD</span>
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            <div className={styles.cover_btn_create_order}>
              <Button
                onClick={() => clickCheckout()}
                className={styles.btn_create_order}
                type="primary"
                htmlType="button"
              >
                <span className={styles.create_order}>CHECKOUT</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
