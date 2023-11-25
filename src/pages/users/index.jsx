/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "antd";
import Loading from "components/loading";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionDeleteUser, actionGetListUser } from "store/User/action";
 
function ListUser() {
  const {  
    listStatus: { isLoading },
    list,
  } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const onGetList = (params) => dispatch(actionGetListUser(params));
  const onDeleteUser = (params) => dispatch(actionDeleteUser(params));
 
  const columns = [
    { 
      title: "Họ tên",
      key: "username",
      render: (_, record) => (
        <div className="d-flex gap-1">{record.fullName}</div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address - b.address,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      sorter: (a, b) => a.password - b.password,
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {format(new Date(record.birthday), "yyyy-MM-dd")}
        </div>
      ),
    },
      
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {record.isDeleted ? "Đã xóa" : "Đang sử dụng"}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link
            to={`/update_user/${record.id}`}
            className="btn btn-outline-primary"
          >
            <img
              src={require("assets/images/edit-report-svgrepo-com.png")}
              width="24px"
              height="24px"
              alt="edit"
            />
          </Link>
          <button
            className="btn btn-outline-danger"
            onClick={() => onDeleteUser(record.id)}
          >
            <img
              src={require("assets/images/delete-trash-svgrepo-com.png")}
              width="24px"
              height="24px"
              alt="edit"
            />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    onGetList();
  }, []);

  return (
    <>
      <div
        style={{ minWidth: "600px" }}
        className="d-flex justify-content-between my-1"
      >
        <h3>Danh sách người dùng</h3>
        <div>
          <Link to="/add_user">
            <button type="button" className="btn btn-success">
              Thêm người dùng
            </button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table rowKey="_id" columns={columns} dataSource={list} />
      ) : (
        <Loading />
      )}
    </>
  );
}
export default ListUser;
