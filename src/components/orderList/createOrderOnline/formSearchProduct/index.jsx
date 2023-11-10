import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "antd";
import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import styles from "./searchProduct.module.scss";
import { actionSearchProduct } from "store/Orders/searchProduct/action";
import { actionAddProductToOrderDetails } from "store/Orders/createOrderDetails/action";

function FormSearchProduct() {
  const dispatch = useDispatch();

  const productList = useSelector(
    (state) => state.searchProductToCreateOrderReducer.payload
  );

  const [inputSearch, setInputSearch] = useState("");

  const handleChangeInputSearch = useCallback((e) => {
    setInputSearch(e.target.value);
  }, []);

  const handleClickSearch = useCallback(
    (e) => {
      e.preventDefault();

      const condition = inputSearch;

      dispatch(actionSearchProduct(condition));
    },
    [dispatch, inputSearch]
  );

  const handleClickAdd = useCallback(
    (product) => {
      const data = {
        productId: product._id,
        name: product.name,
        quantity: 1,
        price: product.price,
        discount: product.discount,
      };

      dispatch(actionAddProductToOrderDetails(data));
    },
    [dispatch]
  );

  const columns = [
    {
      // width: "10%",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return <div className={styles.product_name}>{text}</div>;
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
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "DiscountedPrice",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
    },
    {
      title: " ",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => handleClickAdd(record)}
            icon={<PlusCircleFilled />}
          />
        );
      },
    },
  ];

  return (
    <>
      <form className={styles.form_search_product}>
        <input
          type="text"
          onChange={handleChangeInputSearch}
          placeholder="search sku or name..."
        />

        <button type="submit" onClick={(e) => handleClickSearch(e)}>
          Search
        </button>
      </form>

      <div>
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
