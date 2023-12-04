import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Modal, Popconfirm, Table, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";

import PathDot from "components/svg/pathDot";
import { LOCATIONS } from "constants/index";
import { actionResetsearchCustomer } from "store/Orders/searchCustomer/action";
import styles from "./createOrderOnline.module.scss";
import {
  actionDeleteProdutFromOrderDetails,
  actionIncreaseProductOnOrderDetails,
  actionResetOrderDetailList,
} from "store/Orders/storeProductsArray/action";
import FormSearchProduct from "./formSearchProduct";
import FormSearchCustomer from "./formSearchCustomer";
import {
  actionAddCustomer,
  actionDeleteCustomer,
  actionResetCustomer,
} from "store/Orders/storeCustomer/action";
import FormCreateCustomer from "./formCreateCustomer";
import { actionResetPhoneNumber } from "store/Orders/storePhoneNumber/action";
import FormAddShippingAddress from "./formShippingAddress";
import {
  actionDeleteAddress,
  actionResetAddress,
} from "store/Orders/storeAddress/action";
import {
  actionCreateOrder,
  actionResetCreateOrder,
} from "store/Orders/createOrder/action";
import EditIcon from "components/svg/edit";
import ClearIcon from "components/svg/clear";
import { actionResetSearchProduct } from "store/Orders/searchProduct/action";
import Loading from "components/svg/loading";

function CreateOrderOnline() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [createCustomerFrom] = Form.useForm();

  const [searchCustomerFrom] = Form.useForm();

  const [addShippingAddressFrom] = Form.useForm();

  const [searchProductFrom] = Form.useForm();

  const refInputChangeQuantity = useRef(null);

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

  const handleClickDeletedProduct = useCallback(
    (id) => {
      dispatch(actionDeleteProdutFromOrderDetails(id));
    },
    [dispatch]
  );

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

  const handleSubmitChangeQuantity = useCallback(() => {
    const data = {
      ...productEdit,
      quantity: parseInt(inputChangeQuantity),
    };

    dispatch(actionIncreaseProductOnOrderDetails(data));

    setIsOpenModalEditQuantity(false);
  }, [dispatch, inputChangeQuantity, productEdit]);

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

  const handleClickDeletedCustomer = useCallback(() => {
    dispatch(actionDeleteCustomer());
  }, [dispatch]);

  const handleClickDeletedShippingAddress = useCallback(() => {
    dispatch(actionDeleteAddress());
  }, [dispatch]);

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
    if (createCustomerOrder?.message) {
      switch (createCustomerOrder?.statusCode) {
        case 400:
          // openNotificationWithIcon("error", createCustomerOrder?.message);
          break;

        case 500:
          // openNotificationWithIcon("error", createCustomerOrder?.message);
          break;

        case 200:
          // openNotificationWithIcon("success", createCustomerOrder?.message);

          dispatch(actionAddCustomer(createCustomerOrder?.payload));

          setIsOpenModalCreateCustomer(false);
          break;

        default:
          break;
      }
    }
  }, [api, createCustomerOrder, dispatch, openNotificationWithIcon]);

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

  const handleCreateOrder = useCallback(() => {
    try {
      const reduceOrderDetails = orderDetailsList.map((item) => {
        return {
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          discount: item.discount,
        };
      });

      if (reduceOrderDetails.length === 0 && !customerDetails._id) {
        openNotificationWithIcon(
          "error",
          "Product does not exist, Customer does not exist !!!"
        );
        setIsErrorProduct(true);
        setIsErrorCustomer(true);

        return;
      } else if (reduceOrderDetails.length === 0) {
        openNotificationWithIcon("error", "Product does not exist !!!");
        setIsErrorProduct(true);
        return;
      } else if (isErrorQuantityProduct) {
        openNotificationWithIcon("error", "Invalid product quantity !!!");
        setIsErrorProduct(true);
      } else if (!customerDetails._id) {
        openNotificationWithIcon("error", "Customer does not exist !!!");
        setIsErrorCustomer(true);
        return;
      } else {
        const data = {
          customerId: customerDetails._id,
          employeeId: "6549cb887c35d04757a7e0e2",
          subTotal: temp.toFixed(2),
          shippingFee: shipping.toFixed(2),
          totalPrice: total.toFixed(2),
          shippingAddress: getShippingAddress.address,
          orderDetails: reduceOrderDetails,
        };

        dispatch(actionCreateOrder(data));
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  }, [
    customerDetails._id,
    dispatch,
    getShippingAddress.address,
    isErrorQuantityProduct,
    openNotificationWithIcon,
    orderDetailsList,
    shipping,
    temp,
    total,
  ]);

  useEffect(() => {
    if (Object.keys(resCreateOrder).length > 0) {
      setIsHaveRes(true);
    }
  }, [resCreateOrder]);

  // const clickGotoCheckout = useCallback(() => {
  //   dispatch(actionResetOrderDetailList());
  //   dispatch(actionResetPhoneNumber());
  //   dispatch(actionResetCustomer());
  //   dispatch(actionResetCustomer());
  //   dispatch(actionResetAddress());
  //   dispatch(actionResetCreateOrder());
  // setIsHaveRes(false);

  //   navigate(LOCATIONS.CHECKOUT);
  // }, [dispatch, navigate]);

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
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text, record, index) => {
        return <span className={styles.stock}>{text}</span>;
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
    {
      title: " ",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Popconfirm
            title="Are you sure you want to delete it?"
            okText="OK"
            cancelText="Cancel"
            okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
            onConfirm={() => handleClickDeletedProduct(record.productId)}
          >
            <Button danger icon={<ClearIcon />}></Button>
          </Popconfirm>
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
              <span className={styles.ok}>GO TO CHECKOUT</span>
            </Button>
          </div>
        </div>
      )}

      <div className="container-fluid">
        <div className={`row ${styles.custom_row}`}>
          <div className={`col-12 ${styles.custom_col}`}>
            <h4 className={styles.title_create_order_online}>Create order</h4>
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

            <span className="order_list_path_order">Create order</span>
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
              <button
                onClick={() => {
                  setIsOpenModalSearchProduct(true);
                  searchProductFrom.resetFields();
                  setIsErrorProduct(false);
                  setIsErrorCustomer(false);
                  dispatch(actionResetSearchProduct());
                }}
                className={styles.btn_detail_edit}
              >
                <EditIcon />
              </button>

              <h4 className={styles.title_products}>Products</h4>

              <div className={styles.products_details}>
                <Table
                  rowKey="productId"
                  columns={columns}
                  dataSource={orderDetailsList}
                  pagination={false}
                />

                <Modal
                  open={isOpenModalSearchProduct}
                  centered
                  title="Search Product"
                  onCancel={() => {
                    setIsOpenModalSearchProduct(false);
                  }}
                  cancelText="Close"
                  okButtonProps={{ style: { display: "none" } }}
                >
                  <FormSearchProduct searchProductFrom={searchProductFrom} />
                </Modal>

                <Modal
                  open={isOpenModalEditQuantity}
                  centered
                  title={productEdit.name}
                  onCancel={() => {
                    setIsOpenModalEditQuantity(false);
                  }}
                  cancelText="Close"
                  okText="Save"
                  onOk={handleSubmitChangeQuantity}
                  okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
                >
                  <input
                    className={styles.input_change_quantity}
                    ref={refInputChangeQuantity}
                    type="number"
                    onChange={(e) => setInputChangeQuantity(e.target.value)}
                  />
                </Modal>
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

                    <Popconfirm
                      title="Are you sure you want to delete it?"
                      okText="OK"
                      cancelText="Cancel"
                      okButtonProps={{
                        style: { background: "rgb(0, 167, 111)" },
                      }}
                      onConfirm={() => handleClickDeletedCustomer()}
                    >
                      <Button danger icon={<ClearIcon />}></Button>{" "}
                    </Popconfirm>
                  </>
                )}

                <Modal
                  open={isOpenModalSearchCustomer}
                  centered
                  title="Search Customer"
                  onCancel={() => {
                    setIsOpenModalSearchCustomer(false);
                  }}
                  cancelText="Close"
                  okButtonProps={{ style: { display: "none" } }}
                >
                  <FormSearchCustomer searchCustomerFrom={searchCustomerFrom} />

                  <Button
                    className={styles.btn_create_customer}
                    type="primary"
                    htmlType="button"
                    onClick={() => {
                      createCustomerFrom.resetFields();
                      setIsOpenModalCreateCustomer(true);
                      setIsOpenModalSearchCustomer(false);
                    }}
                  >
                    <span className={styles.create}>Create Customer</span>
                  </Button>
                </Modal>

                <Modal
                  open={isOpenModalCreateCustomer}
                  centered
                  title="Create Customer"
                  onCancel={() => {
                    setIsOpenModalCreateCustomer(false);
                    createCustomerFrom.resetFields();
                  }}
                  cancelText="Close"
                  okButtonProps={{ style: { display: "none" } }}
                >
                  <FormCreateCustomer createCustomerFrom={createCustomerFrom} />
                </Modal>
              </div>

              <button
                onClick={() => {
                  setIsOpenModalSearchCustomer(true);
                  setIsErrorProduct(false);
                  setIsErrorCustomer(false);
                  searchCustomerFrom.resetFields();
                  dispatch(actionResetsearchCustomer());
                  dispatch(actionResetPhoneNumber());
                }}
                className={styles.btn_detail_edit}
              >
                <EditIcon />
              </button>
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

                    <Popconfirm
                      title="Are you sure you want to delete it?"
                      okText="OK"
                      cancelText="Cancel"
                      okButtonProps={{
                        style: { background: "rgb(0, 167, 111)" },
                      }}
                      onConfirm={() => handleClickDeletedShippingAddress()}
                    >
                      <Button danger icon={<ClearIcon />}></Button>
                    </Popconfirm>
                  </>
                )}

                <Modal
                  open={isOpenModalShippingAddress}
                  centered
                  title="Add Shipping Address"
                  onCancel={() => {
                    setIsOpenModalShippingAddress(false);
                    addShippingAddressFrom.resetFields();
                  }}
                  cancelText="Close"
                  okButtonProps={{ style: { display: "none" } }}
                >
                  <FormAddShippingAddress
                    addShippingAddressFrom={addShippingAddressFrom}
                  />
                </Modal>
              </div>

              <button
                onClick={() => {
                  setIsOpenModalShippingAddress(true);
                  addShippingAddressFrom.resetFields();
                }}
                className={styles.btn_detail_edit}
              >
                <EditIcon />
              </button>
            </div>

            <div className={styles.cover_btn_create_order}>
              <Button
                onClick={() => handleCreateOrder()}
                className={styles.btn_create_order}
                type="primary"
                htmlType="button"
              >
                <span className={styles.create_order}>CREATE ORDER</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrderOnline;
