import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { Link } from "react-router-dom";
import { getProduct } from "api/productApi";

const url = process.env.REACT_APP_BASE_URL_ADMIN;

const columns = [
  {
    title: "Tên sản phẩm",
    render: (record) => {
      if (record.image)
        return (
          <Link to={`/product_detail/${record._id}`}>
            <div className="img-products">
              <img
                src={`${url}${record.image.location.split("public", 2)[1]}`}
                alt={record.image.name}
                width="80px"
                height="80px"
              />
              {record.name}
            </div>
          </Link>
        );
      //<img src={`http://localhost:3005${record.image.location.split('public',2)[1]}`} alt="" width="100px" height="100px"/>
      return (
        <div>
          <img
            src={require("assets/images/avatar-header.jpg")}
            alt=""
            width="80px"
            height="80px"
          />
          {record.name}
        </div>
      );
    },
    filters: [
      {
        text: "Iphone",
        value: "Iphone",
      },
      {
        text: "Samsung",
        value: "Samsung",
      },
      //   {
      //     text: 'Category 1',
      //     value: 'Category 1',
      //     children: [
      //       {
      //         text: 'Yellow',
      //         value: 'Yellow',
      //       },
      //       {
      //         text: 'Pink',
      //         value: 'Pink',
      //       },
      //     ],
      //   },
      //   {
      //     text: 'Category 2',
      //     value: 'Category 2',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: "Giá gốc",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },

  {
    title: "Giảm giá",
    dataIndex: "discount",
    // filters: [
    //   {
    //     text: "stock",
    //     value: "stock",
    //   },
    //   {
    //     text: "stock",
    //     value: "stock",
    //   },
    // ],
    // onFilter: (value, record) => record.address.startsWith(value),
    // filterSearch: true,
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Giá sale",

    // filters: [
    //   {
    //     text: "stock",
    //     value: "stock",
    //   },
    //   {
    //     text: "stock",
    //     value: "stock",
    //   },
    // ],
    // onFilter: (value, record) => record.address.startsWith(value),
    // filterSearch: true,
    render: (id, record) => (
      <Link>{(record.price * (100 - record.discount)) / 100}</Link>
    ),
  },

  {
    title: "Số lượng còn",
    dataIndex: "stock",
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="d-flex gap-1">
        <button className="btn btn-outline-primary">Cập nhật</button>
        <button className="btn btn-outline-danger">Xóa</button>
      </div>
    ),
  },
];

function ProductList() {
  const [product, setProduct] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProduct();
      setProduct(res.data.payload);
    };
    fetchData();
  },[]);
  return (
    <>
      <div className="d-flex justify-content-between my-1">
        <h3>Danh sách sản phẩm</h3>
        <div>
          <button type="button" className="btn btn-primary">
            Thêm sản phẩm
          </button>
        </div>
      </div>
      <Table
        rowKey="_id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={product}
        style={{ minWidth: "600px" }}
      />
    </>
  );
}
export default ProductList;
