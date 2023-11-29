import React, { useCallback, useEffect, useRef } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styles from "./createCustomer.module.scss";
import { actionCreateCustomerOrder } from "store/Orders/createCustomerOrder/action";
import Loading from "components/svg/loading";

function FormCreateCustomer(props) {
  const { createCustomerFrom } = props;

  const dispatch = useDispatch();

  const createCustomerOrder = useSelector(
    (state) => state.createCustomerOrderReducer.payload
  );

  const isLoading = useSelector(
    (state) => state.createCustomerOrderReducer.isLoading
  );

  const getPhoneNumber = useSelector(
    (state) => state.storePhoneNumberReducer.payload
  );

  const validatePhoneNumber = (_rule, value) => {
    const phoneNumberRegex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

    return new Promise((resolve, reject) => {
      if (value && !value.match(phoneNumberRegex)) {
        reject("Invalid Phone Number");
      } else {
        resolve();
      }
    });
  };

  const validateEmail = (_rule, value) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    return new Promise((resolve, reject) => {
      if (value && !value.match(emailRegex)) {
        reject("Invalid Email");
      } else {
        resolve();
      }
    });
  };

  const provinceList = [
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
    {
      value: "3",
      label: "Communicated",
    },
    {
      value: "4",
      label: "Identified",
    },
    {
      value: "5",
      label: "Resolved",
    },
    {
      value: "6",
      label: "Cancelled",
    },
  ];

  const dateFormat = "DD/MM/YYYY";

  const onFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionCreateCustomerOrder(values));
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch]
  );

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}

      <Form
        initialValues={{
          phoneNumber: getPhoneNumber.phoneNumber,
        }}
        form={createCustomerFrom}
        className=""
        name="Create Customer"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            { required: true, message: "Please type First Name" },
            { max: 50, message: "Max 50 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            { required: true, message: "Please type Last Name" },
            { max: 50, message: "Max 50 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please type Phone Number" },
            { validator: validatePhoneNumber },
            { max: 50, message: "Max 50 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please type Email" },
            { validator: validateEmail },
            { max: 50, message: "Max 50 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Birthday" name="birthday">
          <DatePicker
            style={{
              width: "100%",
            }}
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please type Password" },
            { min: 6, message: "Min 6 characters" },
            { max: 16, message: "Max 16 characters" },
          ]}
        >
          <Input.Password
            autoComplete="new-password"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please type Address" },
            { max: 500, message: "Max 500 characters" },
          ]}
        >
          <Select
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Select Province"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={provinceList}
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
            <span className={styles.create}>Create Customer</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormCreateCustomer;
