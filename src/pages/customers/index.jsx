/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "antd";
import Loading from "components/loading";
import ClearIcon from "components/svg/clear";
import EditIcon from "components/svg/edit";
// import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionDeleteUser, actionGetListUser } from "store/User/action";
import { array } from "yup";

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
      title: "Name",
      key: "username",
      render: (_, record) => (
        <div className="d-flex gap-1">{record.fullName}</div>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Address",
      // dataIndex: "address",
      // sorter: (a, b) => a.address - b.address,
      render: (_, record) => (
       <span >{record?.address[0]?.address}-{record?.address[0]?.wardName}-{record?.address[0]?.districtName}-{record?.address[0]?.provinceName}</span>
      ),
      width:"15%"
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Birthday",
      key: "birthday",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {new Date(record.birthday).toLocaleDateString("en-GB")}
          {/* {format(new Date(record.birthday), "yyyy-MM-dd")} */}
        </div>
      ),
    },

    {
      title: "Status",
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
            to={`/update_customer/${record.id}`}
            className="btn border"
          >
            <EditIcon/>
          </Link>
          <button
            className="btn border"
            onClick={() => onDeleteUser(record.id)}
          >
            <ClearIcon/>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    // const fetchData = async () => {
    //   setIsLoading(true);
    //   const res = await getProduct();
    //   setProduct(res?.data?.payload);
    //   setIsLoading(false);
    // };
    // fetchData();
    onGetList();
  }, []);
  console.log('◀◀◀ list.delete(',list);
  return (
    <>
      <div
        style={{ minWidth: "600px" }}
        className="d-flex justify-content-between my-1"
      >
        <h3>List Users</h3>
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