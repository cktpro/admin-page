import React, { useCallback, useEffect, useState } from "react";
import { Popconfirm, Table, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getProductDetail } from "api/productApi";
import Loading from "components/loading";
import EditIcon from "components/svg/edit";
import ClearIcon from "components/svg/clear";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

const url = process.env.REACT_APP_BASE_URL_ADMIN;
function ProductList() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const deleteProduct = useCallback((id) => async () => {
    try {
      axiosAdmin.defaults.headers.common["Authorization"] =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDEzNTQ2NzUsIl9pZCI6IjY1NDlkOTNmOWVmNTI1ZGU1MzU5MzE0NSIsImZpcnN0TmFtZSI6IkPDoXAiLCJsYXN0TmFtZSI6IktpbSBUcuG6p20iLCJwaG9uZU51bWJlciI6Ijg0MDM1NzA4MTE4NiIsImFkZHJlc3MiOiJRdeG6o25nIFRy4buLIiwiZW1haWwiOiJja3Rwcm9AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA3VDA2OjI5OjE5Ljc5M1oiLCJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTcwMTQ0MTA3NX0.-_Te3qpxmwskrYIjSARTKAisRGtXYwCtM9qagI6AVFM";
      // Xóa sản phẩm
      const imgResponse = await axiosAdmin.get(`/products/${id}`);
      console.log("««««« imgResponse »»»»»", imgResponse);
      const imgId = imgResponse.data.payload.image.id;
      const deleteImgResponse = await axiosAdmin.delete(`/media/${imgId}`);
      console.log("◀◀◀ Xóa ảnh thành công ▶▶▶");

      const imgListId = imgResponse.data.payload.imageList;
      for (const mediaId of imgListId) {
        const id = mediaId.mediaId;
        console.log(mediaId);
        const deleteImgListResponse = await axiosAdmin.delete(`/media/${id}`);
        console.log("◀◀◀ Xóa list ảnh thành công ▶▶▶");
      }

      const response = await axiosAdmin.patch(`/products/delete/${id}`);
      console.log("◀◀◀ Xóa sản phẩm thành công ▶▶▶");

      message.success(response.data.message);
      window.location.reload();

      return response.data;
    } catch (error) {
      message.error(
        error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm"
      );
      throw new Error(
        error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm"
      );
    }
  });

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
                  src={
                    record.image
                      ? `${record.image.location}`
                      : require("assets/images/No-Image-Placeholder.png")
                  }
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
      sorter: (e) => console.log("◀◀◀ e ▶▶▶", e),
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
        return (
          <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link to={`/update_product/${record._id}`}>
            <button className="btn border"
             onConfirm={() => getProductDetail(record._id)}>
              <EditIcon />
            </button>
          </Link>

          <Popconfirm
            title="Do you want to delete?"
            okText="Yes"
            cancelText="Cancel"
            onConfirm={deleteProduct(record._id)}
          >
            <button className="btn border">
              <ClearIcon />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

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
      const res = await axiosAdmin.get("products?page=1&pageSize=100") 
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
