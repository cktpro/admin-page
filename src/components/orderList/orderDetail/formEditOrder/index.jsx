import { Button, Form, Select } from "antd";
import React, { useCallback } from "react";

import styles from "./editOrder.module.scss";
import { useDispatch } from "react-redux";
import { actionUpdateOrderDetail } from "store/Orders/getOrderDetail/action";

function FormEditOrder(props) {
  const { editOrderFrom, orderDetail, closeModal } = props;

  const dispatch = useDispatch();

  console.log("««««« orderDetail »»»»»", orderDetail);

  const orderStatus = [
    {
      value: "WAITING",
      label: "WAITING",
    },
    {
      value: "PAID",
      label: "PAID",
    },
    {
      value: "COMPLETED",
      label: "COMPLETED",
    },
    {
      value: "CANCELED",
      label: "CANCELED",
    },
    {
      value: "REJECTED",
      label: "REJECTED",
    },
    {
      value: "DELIVERING",
      label: "DELIVERING",
    },
  ];

  const orderPaymentType = [
    {
      value: "CASH",
      label: "CASH",
    },
    {
      value: "CREDIT_CARD",
      label: "CREDIT_CARD",
    },
  ];

  const onFinish = useCallback(
    (values) => {
      const data = {...values, id: orderDetail?._id}
      dispatch(actionUpdateOrderDetail(data));
      closeModal();
    },
    [dispatch]
  );

  return (
    <Form
      initialValues={{
        status: orderDetail?.status,
        paymentType: orderDetail?.paymentType,
      }}
      form={editOrderFrom}
      name="Create Customer"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please type status" }]}
      >
        <Select
          // showSearch
          style={{
            width: "100%",
          }}
          placeholder="Select Status"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={orderStatus}
        />
      </Form.Item>

      <Form.Item
        label="Payment Type"
        name="paymentType"
        rules={[{ required: true, message: "Please type Payment Type" }]}
      >
        <Select
          // showSearch
          style={{
            width: "100%",
          }}
          placeholder="Select Payment Type"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={orderPaymentType}
        />
      </Form.Item>

      <Form.Item
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          className={styles.btn_create_customer}
          type="primary"
          htmlType="submit"
        >
          <span className={styles.create}>SAVE</span>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormEditOrder;
