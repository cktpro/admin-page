import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Popconfirm, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import PathDot from "components/svg/pathDot";
import { LOCATIONS } from "constants/index";
import SearchIcon from "components/svg/search";
import { actionsearchCustomer } from "store/Orders/searchCustomer/action";
import styles from "./createOrderOnline.module.scss";
import {
  actionDeleteProdutFromOrderDetails,
  actionIncreaseProductOnOrderDetails,
} from "store/Orders/createOrderDetails/action";
import FormSearchProduct from "./formSearchProduct";

function CreateOrderOnline() {
  const dispatch = useDispatch();

  const refInputChangeQuantity = useRef(null);

  const [isOpenModalSearchProduct, setIsOpenModalSearchProduct] =
    useState(false);

  const [isOpenModalEditQuantity, setIsOpenModalEditQuantity] = useState(false);

  const [inputChangeQuantity, setInputChangeQuantity] = useState(0);

  const [productEdit, setProductEdit] = useState({});

  const [temp, setTemp] = useState(0);

  const [shipping, setShipping] = useState(0);

  const [total, setTotal] = useState(0);

  const orderDetailsList = useSelector(
    (state) => state.createOrderDetailsReducer.payload
  );

  useEffect(() => {
    console.log("««««« orderDetailsList »»»»»", orderDetailsList);
  }, [orderDetailsList]);

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
      setShipping(0);
      setTotal(0);
    }

    if (orderDetailsList.length > 0) {
      calBilling();
    }
  }, [calBilling, orderDetailsList]);

  const columns = [
    {
      // width: "10%",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return (
          <div className={styles.cover_product_name}>
            <img
              className={styles.product_img}
              src={require("assets/images/chuotda.webp")}
              alt="..."
            />

            <div className={styles.product_name}>{text}</div>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => {
        return (
          <div className={styles.cover_quantity}>
            <span type="number" className={styles.product_quantity}>
              {text}
            </span>

            <Button
              onClick={() => handleClickChangeQuantity(record)}
              type="none"
              icon={<EditFilled />}
            />
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Discounted Price",
      // dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text, record, index) => {
        return (
          <span>
            {(record.quantity * record.price * (100 - record.discount)) / 100}
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
            title="Bạn chắc muốn xóa không"
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => handleClickDeletedProduct(record.productId)}
          >
            <Button danger icon={<DeleteFilled />} />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="container-fluid">
      <div className={`row ${styles.custom_row}`}>
        <div className={`col-12 ${styles.custom_col}`}>
          <h4 className={styles.title_create_order_online}>Tạo đơn online</h4>
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

          <span className="order_list_path_order">Tạo đơn online</span>
        </div>

        <div className={`row ${styles.custom_row}`}>
          <div
            className={`col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 ${styles.custom_col}`}
          >
            <div className={styles.products}>
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
                  okText="Save"
                  onOk={() => {
                    setIsOpenModalSearchProduct(false);
                  }}
                >
                  <FormSearchProduct />
                </Modal>

                <Modal
                  open={isOpenModalEditQuantity}
                  centered
                  title="Edit Quantity"
                  onCancel={() => {
                    setIsOpenModalEditQuantity(false);
                  }}
                  cancelText="Close"
                  okText="Save"
                  onOk={handleSubmitChangeQuantity}
                >
                  <input
                    ref={refInputChangeQuantity}
                    type="number"
                    onChange={(e) => setInputChangeQuantity(e.target.value)}
                  />
                </Modal>
              </div>

              <button onClick={() => setIsOpenModalSearchProduct(true)}>
                ADD
              </button>
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

                  <span className={styles.provisional_total}>{temp}</span>
                </div>

                <div className={styles.cover_shipping}>
                  <span className={styles.shipping_title}>Shipping</span>

                  <span className={styles.shipping}>{shipping}</span>
                </div>

                <div className={styles.cover_total}>
                  <span className={styles.total_title}>Total</span>

                  <span className={styles.total}>{total}</span>
                </div>

                {/* <div> */}
                  <button type="button" onClick={() => setShipping(10000)}>Add Shipping</button>
                  <button type="button" onClick={() => setShipping(0)}>Remove Shipping</button>
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className={`col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4`}></div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderOnline;
