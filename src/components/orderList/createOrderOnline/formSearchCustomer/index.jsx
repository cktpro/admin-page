import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, Space, Table, notification } from "antd";

import styles from "./searchCustomer.module.scss";
import { actionsearchCustomer } from "store/Orders/searchCustomer/action";
import { actionAddCustomer } from "store/Orders/storeCustomer/action";
import { actionAddPhoneNumber } from "store/Orders/storePhoneNumber/action";
import Loading from "components/svg/loading";

function FormSearchCustomer(props) {
  const { searchCustomerFrom } = props;

  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();

  const [inputSearch, setInputSearch] = useState("");

  const customerList = useSelector(
    (state) => state.searchCustomerOrderReducer.payload
  );

  const isLoading = useSelector(
    (state) => state.searchCustomerOrderReducer.isLoading
  );

  const handleClickAdd = useCallback(
    (customer) => {
      dispatch(actionAddCustomer(customer));
    },
    [dispatch]
  );

  const handleChangeInputSearch = useCallback(
    (e) => {
      setInputSearch(e.target.value);

      dispatch(actionAddPhoneNumber({ phoneNumber: e.target.value }));
    },
    [dispatch]
  );

  const handleClickSearch = useCallback(() => {
    const condition = inputSearch;

    dispatch(actionsearchCustomer(condition));
  }, [dispatch, inputSearch]);

  useEffect(() => {
    const openNotificationWithIcon = (type, message) => {
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

        case "warning":
          api[type]({
            message: "WARNING",
            description: message,
          });
          break;

        default:
          break;
      }
    };

    if (customerList?.message) {
      switch (customerList?.statusCode) {
        case 404:
          openNotificationWithIcon("warning", customerList?.message);
          break;

        case 500:
          openNotificationWithIcon("error", customerList?.message);
          break;

        case 200:
          openNotificationWithIcon("success", customerList?.message);
          break;

        default:
          break;
      }
    }
  }, [api, customerList]);

  const columns = [
    {
      title: " ",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Button
            className={styles.btn_add}
            type="primary"
            onClick={() => handleClickAdd(record)}
          >
            <span className={styles.add}>+</span>
          </Button>
        );
      },
    },
    {
      // width: "10%",
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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

      <Form
        form={searchCustomerFrom}
        className=""
        name="Search Customer"
        // wrapperCol={{ span: 24 }}
        onFinish={() => handleClickSearch()}
        autoComplete="off"
      >
        <Space>
          <Form.Item name="inputSearch">
            <Input onChange={handleChangeInputSearch} />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.btn_search_customer}
              type="primary"
              htmlType="submit"
            >
              <span className={styles.search}>Search</span>
            </Button>
          </Form.Item>
        </Space>
      </Form>

      <div className={styles.cover_table_search_customer}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={customerList.payload}
          pagination={false}
        />
      </div>
    </>
  );
}

export default FormSearchCustomer;
