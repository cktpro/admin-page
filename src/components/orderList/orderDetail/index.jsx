// OrderDetail
// Created by Man Nguyen
// 29/10/2023

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import "numeral/locales/vi";

import styles from "./orderDetail.module.scss";
import { actiongetOrderDetail } from "store/Orders/getOrderDetail/action";
import EditIcon from "components/svg/edit";
import { Form, Modal } from "antd";
import FormEditOrder from "./formEditOrder";
import { formattedMoney } from "helper/formatDocuments";
import Loading from "components/svg/loading";
import { axiosAdminMan } from "helper/axios";

function OrderDetail(props) {
  const params = useParams();
  const dispatch = useDispatch();

  const [editOrderFrom] = Form.useForm();

  const resGetOrderDetail = useSelector((state) => state.getOrderDetailReducer);

  const isLoadingGetOrderDetail = useSelector(
    (state) => state.getOrderDetailReducer.isLoading
  );

  const [orderDetail, setOrderDetail] = useState({});

  const [isOpenEditOrder, setIsOpenEditOrder] = useState(false);

  const [isFlashsale, setIsFlashsale] = useState(false);

  const [flashsale, setFlashsale] = useState(0);

  // const [isLoading, setIsLoading] = useState(false);

  const getOrderDetail = useCallback(() => {
    dispatch(actiongetOrderDetail(params.id));
    // setIsLoading(isLoadingGetOrderDetail);
  }, [dispatch, params.id]);

  useEffect(() => {
    getOrderDetail();
  }, [getOrderDetail]);

  useEffect(() => {
    setOrderDetail(resGetOrderDetail?.payload?.payload);
  }, [resGetOrderDetail]);

  useEffect(() => {
    console.log("««««« orderDetail »»»»»", orderDetail);
  }, [orderDetail]);

  const checkFlashsale = useCallback(async () => {
    const check = await axiosAdminMan.get(
      `/flashsale/check-flashsale?productId=${orderDetail.orderDetails[0].productId}`
    );
    console.log("««««« check.data »»»»»", check.data);
    if (check.data.message === "found") {
      setIsFlashsale(true);
      setFlashsale(check.data.discount);
    }
  }, [orderDetail]);

  useEffect(() => {
    if (orderDetail?.orderDetails) {
      checkFlashsale();
    }
  }, [orderDetail]);

  const getStyleStatus = useCallback((text) => {
    switch (text) {
      case "COMPLETED":
        return {
          "--bg-color": "rgba(34, 197, 94, 0.16)",
          "--color": "rgb(17, 141, 87)",
        };
      case "WAITING":
        return {
          "--bg-color": "rgba(255, 171, 0, 0.16)",
          "--color": "rgb(183, 110, 0)",
        };
      case "CANCELED":
        return {
          "--bg-color": "rgba(255, 86, 48, 0.16)",
          "--color": "rgb(183, 29, 24)",
        };
      case "REJECTED":
        return {
          "--bg-color": "rgba(145, 158, 171, 0.16)",
          "--color": "rgb(99, 115, 129)",
        };
      case "DELIVERING":
        return {
          "--bg-color": "rgba(0, 157, 255, 0.16)",
          "--color": "rgb(0, 110, 183)",
        };
      default:
        return null;
    }
  }, []);

  const rederTotalOriginPrice = useCallback(() => {
    let total = 0;

    orderDetail?.orderDetails?.forEach((item) => {
      total +=
        (parseInt(item.price) *
          parseInt(item.quantity) *
          (100 - parseInt(item.discount))) /
        100;
    });

    return total;
  }, [orderDetail?.orderDetails]);

  const renderTotalPrice = useCallback(() => {
    const total = (rederTotalOriginPrice() * (100 - 0)) / 100;

    return total;
  }, [rederTotalOriginPrice]);

  const closeModal = useCallback(() => {
    setIsOpenEditOrder(false);
  }, []);

  return (
    <>
      {isLoadingGetOrderDetail && (
        <div className="cover_loading">
          <Loading />
        </div>
      )}

      <Modal
        open={isOpenEditOrder}
        centered
        title="Add Shipping Address"
        onCancel={() => {
          setIsOpenEditOrder(false);
          editOrderFrom.resetFields();
        }}
        cancelText="Close"
        okButtonProps={{ style: { display: "none" } }}
      >
        <FormEditOrder
          editOrderFrom={editOrderFrom}
          orderDetail={orderDetail}
          closeModal={closeModal}
        />
      </Modal>

      <div className={`container-fluid ${styles.order_detail}`}>
        {/* title */}
        <div className={`row ${styles.custom_row} ${styles.title}`}>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${styles.custom_col}`}
          >
            <div className={styles.left_title}>
              <div className={styles.cover_title}>
                <span className={styles.order_id}>#{orderDetail?._id}</span>

                <span
                  className={styles.status}
                  style={getStyleStatus(orderDetail?.status)}
                >
                  {orderDetail?.status}
                </span>
              </div>

              <span
                className={styles.create_date}
              >{`${orderDetail?.createdDate?.substring(
                0,
                10
              )} ${orderDetail?.createdDate?.substring(11, 19)}`}</span>
            </div>
          </div>

          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${styles.custom_col}`}
          >
            <div className={styles.right_title}>
              <button
                onClick={() => setIsOpenEditOrder(true)}
                className={styles.btn_edit}
              >
                <EditIcon /> Edit
              </button>
            </div>
          </div>
        </div>

        <div className={`row ${styles.custom_row}`}>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 ${styles.custom_col}`}
          >
            <div className={styles.cover_detail_history}>
              <div className={styles.detail}>
                <div className={styles.cover_detail_edit}>
                  <span className={styles.detail_title}>Bill</span>
                </div>

                <div className={styles.cover_products}>
                  {orderDetail?.orderDetails?.map((item) => {
                    return (
                      <div key={item.id} className={styles.cover_product_item}>
                        <div className={styles.cover_product_name_img}>
                          <img
                            className={styles.img_products}
                            src={item?.product?.image?.location}
                            alt="..."
                          />

                          <div className={styles.cover_product_name_category}>
                            <span className={styles.product_name}>
                              {item?.product?.name}
                            </span>

                            <span className={styles.product_category}>
                              {item?.product?.category?.name}
                            </span>
                          </div>
                        </div>

                        <div className={styles.cover_item_quantity_price}>
                          <span className={styles.item_quantity}>
                            x{item.quantity}
                          </span>

                          <span className={styles.item_discount}>
                            -{item.discount}%
                          </span>

                          <span className={styles.item_origin_price}>
                            {formattedMoney(item.price)}
                          </span>

                          <span className={styles.item_price}>
                            {formattedMoney(
                              ((item.price * (100 - item.discount)) / 100) *
                                item.quantity
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.cover_total}>
                  <div className={styles.cover_field}>
                    {isFlashsale && (
                      <span className={styles.flashsale}>Flashsale: </span>
                    )}

                    <span className={styles.temp_total}>Subtotal</span>

                    <span className={styles.temp_total}>Shipping</span>

                    <span className={styles.total}>Total</span>
                  </div>

                  <div className={styles.cover_price}>
                    {isFlashsale && (
                      <span className={styles.flashsale_number}>
                        {!isNaN(parseFloat(flashsale)) ? `${flashsale}%` : 0}
                      </span>
                    )}
                    <span className={styles.temp_price}>
                      {!isNaN(
                        parseFloat(
                          resGetOrderDetail?.payload?.payload?.totalPrice
                        )
                      )
                        ? formattedMoney(
                            resGetOrderDetail?.payload?.payload?.totalPrice
                          )
                        : 0}
                    </span>

                    <span className={styles.temp_price}>
                      {!isNaN(
                        parseFloat(
                          resGetOrderDetail?.payload?.payload?.shippingFee
                        )
                      )
                        ? formattedMoney(
                            resGetOrderDetail?.payload?.payload?.shippingFee
                          )
                        : 0}
                    </span>

                    <span className={styles.total_price}>
                      {!isNaN(
                        parseFloat(
                          resGetOrderDetail?.payload?.payload?.shippingFee
                        )
                      )
                        ? formattedMoney(
                            +resGetOrderDetail?.payload?.payload?.totalPrice +
                              +resGetOrderDetail?.payload?.payload?.shippingFee
                          )
                        : 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.shipping_payment}>
                <div className={styles.cover_detail_edit}>
                  <span className={styles.detail_title}>Delivery</span>
                </div>

                <div className={styles.cover_address}>
                  <span className={styles.address_field}>Address</span>

                  <span className={styles.address}>
                    {orderDetail?.shippingAddress}
                  </span>
                </div>

                <div className={styles.cover_address}>
                  <span className={styles.address_field}>Phone number</span>

                  <span className={styles.address}>
                    {orderDetail?.customer?.phoneNumber}
                  </span>
                </div>

                <div className={styles.hr_bottom}></div>

                <div className={styles.cover_detail_edit}>
                  <span className={styles.detail_title}>Pay</span>
                </div>

                <div className={styles.cover_address}>
                  <span className={styles.address_field}>Payment type</span>

                  <span className={styles.address}>
                    {orderDetail?.paymentType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ${styles.custom_col}`}
          >
            <div className={styles.customer}>
              <div className={styles.cover_detail_edit}>
                <span className={styles.detail_title}>Customer</span>
              </div>

              <div className={styles.cover_customer}>
                <div className={styles.avatar}>
                  <img
                    className={styles.avatar_img}
                    src={require("assets/images/avatar_2.jpg")}
                    alt="..."
                  />
                </div>

                <div className={styles.cover_customer_info}>
                  <span className={styles.customer_name}>
                    {orderDetail?.customer?.fullName}
                  </span>

                  <span className={styles.customer_email}>
                    {orderDetail?.customer?.email}
                  </span>

                  <span className={styles.customer_phone}>
                    {orderDetail?.customer?.phoneNumber}
                  </span>
                </div>
              </div>

              <div className={styles.hr_bottom}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
