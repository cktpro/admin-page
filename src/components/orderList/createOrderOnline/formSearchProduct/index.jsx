import React, { useCallback, useState } from "react";
import { Button, Form, Input, Space, Table, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styles from "./searchProduct.module.scss";
import { actionSearchProduct } from "store/Orders/searchProduct/action";
import { actionAddProductToOrderDetails } from "store/Orders/storeProductsArray/action";
import Loading from "components/svg/loading";

function FormSearchProduct(props) {
  const { searchProductFrom } = props;

  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();

  const productList = useSelector(
    (state) => state.searchProductToCreateOrderReducer.payload
  );

  const isLoading = useSelector(
    (state) => state.searchProductToCreateOrderReducer.isLoading
  );

  const [inputSearch, setInputSearch] = useState("");

  const handleChangeInputSearch = useCallback((e) => {
    setInputSearch(e.target.value);
  }, []);

  const handleClickSearch = useCallback(() => {
    const condition = inputSearch;

    dispatch(actionSearchProduct(condition));
  }, [dispatch, inputSearch]);

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

        case "warning":
          api[type]({
            message: "WARNING",
            description: message,
          });
          break;

        default:
          break;
      }
    },
    [api]
  );

  const handleClickAdd = useCallback(
    (product) => {
      if (product.stock <= 0) {
        openNotificationWithIcon("error", "product is out of stock !!!");

        return;
      }

      const data = {
        productId: product._id,
        name: product.name,
        stock: product.stock,
        quantity: 1,
        price: product.price,
        discount: product.discount,
        image: product.image.location,
      };

      dispatch(actionAddProductToOrderDetails(data));
    },
    [dispatch, openNotificationWithIcon]
  );

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
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return (
          <div className={styles.cover_product_name_img}>
            <div className={styles.cover_product_img}>
              <img
                className={styles.cover_product_img}
                src={record.image.location}
                alt="..."
              />
            </div>

            <span className={styles.product_name}>{text}</span>
          </div>
        );
      },
    },
    {
      title: "DiscountedPrice",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text, record, index) => {
        return (
          <span className={styles.discounted_price}>
            $
            {(
              (record.price * (100 - record.discount)) /
              100
            ).toFixed(2)}
          </span>
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
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
        form={searchProductFrom}
        className=""
        name="Search Products"
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
              className={styles.btn_search_products}
              type="primary"
              htmlType="submit"
            >
              <span className={styles.search}>Search</span>
            </Button>
          </Form.Item>
        </Space>
      </Form>

      <div className={styles.cover_table_result}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={productList.payload}
          pagination={false}
        />
      </div>
    </>
  );
}

export default FormSearchProduct;
