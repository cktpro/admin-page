// Table Order List
// Created by Man Nguyen
// 19/10/2023

import React from "react";
import { Space, Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";
import { Link } from "react-router-dom";

import { LOCATIONS } from "constants/index";
import "./tableOrderList.scss";

function TableOrderList(props) {
  const { orderList } = props;

  const columns = [
    {
      title: "Order",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => (
        <span className="link_id">
          <Link to={`${LOCATIONS.PRODUCTS}/${record._id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text, record, index) => (
        <div className="cover_cus_info">
          <div className="cover_cus_avatar">
            <img
              className="d-block w-100"
              src={require("assets/images/avatar_2.jpg")}
              alt="..."
            />
          </div>

          <div className="cover_cus_name">
            <span>{record?.customer?.fullName}</span>
            <span className="cus_email">{record?.customer?.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record, index) => (
        <span className="order_createdDate">
          {record?.createdDate?.substring(0, 10)}
        </span>
      ),
    },
    {
      title: "Items",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (text, record, index) => {
        if (record?.orderDetails?.length > 0) {
          return (
            <span className="order_items">
              {record?.orderDetails?.length || 0}
            </span>
          );
        }

        return <span className="order_items">0</span>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record, index) => (
        <span className="order_totalPrice">
          {numeral(text).format("0,0")} VNĐ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <span className={`table_${text}`}>{text}</span>
      ),
    },

    {
      title: "Hành động",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              // onClick={onSelectProduct(record)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={orderList}
        pagination={false}
      />
    </>
  );
}

export default TableOrderList;
