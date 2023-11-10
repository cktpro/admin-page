import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form, Input, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteCategory, getCategory, getCategoryDetail, updateCategory } from "api/categoryApi";
import Loading from "components/loading";
import { LOCATIONS } from "constants";
import { Navigate, useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_BASE_URL_ADMIN;

const columns = [
  {
    title: "Tên danh mục",
    render: (record) => {
      return (
        <div className="mx-2">
          <p className="m-0 fw-bold">{record.name}</p>
        </div>
      );
    },
  },
  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },
  {
    title: "Ngày tạo",
    render: (record) => {
      return <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="d-flex gap-1">
        <Link to={`/categories/${record._id}`}>
          <button className="btn btn-outline-primary"
          onConfirm={() => getCategoryDetail(record._id)}>
            <img
              src={require("assets/images/edit-report-svgrepo-com.png")}
              width="24px"
              height="24px"
              alt="edit"
            />
          </button>
          
        </Link>

        <Popconfirm
          title="Bạn có muốn xóa không?"
          okText="Đồng ý"
          cancelText="Hủy"
          onConfirm={() => deleteCategory(record._id)}
        >
          <button className="btn btn-outline-danger">
            <img
              src={require("assets/images/delete-trash-svgrepo-com.png")}
              width="24px"
              height="24px"
              alt="edit"
            />
          </button>
        </Popconfirm>
      </div>
    ),
  },
];

function CategoryList() {
  const [isLoading, setIsLoading] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate()

  const handleRowClick = (record) => {
    const categoryId = record._id;
    console.log("categoryId", categoryId);
    // navigate(`/categories/${categoryId}`);
  };
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
      const res = await getCategory();
      console.log('◀◀◀ res ▶▶▶',res);
      setCategory(res.data.payload);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ minWidth: "600px" }} className="d-flex justify-content-between my-1">
        <h3>Danh sách danh mục</h3>
        <div>
          <Link to="/add_category">
            <button type="button" className="btn btn-success">Thêm danh mục</button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={category}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default CategoryList;