import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getProduct } from "api/productApi";
import Loading from "components/loading";
import EditIcon from "components/svg/edit";
import ClearIcon from "components/svg/clear";

const url = process.env.REACT_APP_BASE_URL_ADMIN;

const columns = [
  {
    title: "Product Name",
    render: (record) => {
      if (record.image)
        return (
          <Link to={`/product_detail/${record._id}`}>
            <div className="d-flex align-items-center img-products">
              
              <img
                // src={`${url}${record.image.location.split("public", 2)[1]}`}
                src={record.image? `${record.image.location}`:require('assets/images/No-Image-Placeholder.png')}
                alt={record.image.name}
                width="80px"
                height="80px"
                style={{ objectFit: "cover" }}
              />
              <div className="mx-2">
                <p className="m-0 fw-bold">{record.name}</p>
                <p className="m-0 text-black-50">{record.category.name}</p>
              </div>
            </div>
          </Link>
        );
      //<img src={`http://localhost:3005${record.image.location.split('public',2)[1]}`} alt="" width="100px" height="100px"/>
      return (
        <Link to={`/product_detail/${record._id}`}>
          <div className="d-flex align-items-center img-products">
            <img
              src={require("assets/images/No-Image-Placeholder.png")}
              alt=""
              width="80px"
              height="80px"
              style={{ objectFit: "cover" }}
            />
            <div className="mx-2">
              <p className="m-0 fw-bold">{record.name}</p>
              <p className="m-0 text-black-50">{record.category.name}</p>
            </div>
          </div>
        </Link>
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
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: "Regular Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },

  {
    title: "Discount",
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
    sorter: (e) => console.log('◀◀◀ e ▶▶▶',e),
  },
  {
    title: "Sale Price",

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
    title: "Stock",
    render: (record) => (
      <span
        className={`${
          record.stock > 100
            ? "badge bg-success"
            : `${record.stock > 50 ? "badge  bg-warning" : "badge bg-danger"}`
        }`}
      >
        {record.stock}
      </span>
    ),
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: "Create At",
    render: (record) => {
      return <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="d-flex gap-1">
        <button className="btn border">
          <EditIcon/>
        </button>
        <button className="btn border">
          <ClearIcon/>
        </button>
      </div>
    ),
  },
];

function ProductList() {
  const [isLoading, setIsLoading] = useState(null);
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
      setIsLoading(true);
      const res = await getProduct();
      setProduct(res?.data?.payload);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{ minWidth: "600px" }}
        className="d-flex justify-content-between my-1"
      >
        <h3>Product List</h3>
        <div>
          <Link to="/add_product">
            <button type="button" className="btn btn-success">
              Add Product
            </button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={product}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
export default ProductList;
