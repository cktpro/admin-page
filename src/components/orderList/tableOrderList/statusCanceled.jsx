import React, { useCallback, useEffect, useState } from "react";
import { Space, Table, Button, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";
import { Link } from "react-router-dom";

import { LOCATIONS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllOrdersCanceled } from "store/Orders/getOrderListCanceled/action";
import "./tableOrderList.scss";

function StatusCanceled() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare resGetAllOrdersCanceled of orderCanceledReducer state
  const resGetAllOrdersCanceled = useSelector(
    (state) => state.orderCanceledReducer.payload
  );

  // declare defaultPagination of get all order completed
  const defaultPagination = {
    total: resGetAllOrdersCanceled?.total || 0,
    page: resGetAllOrdersCanceled?.page || 1,
    pageSize: resGetAllOrdersCanceled?.pageSize || 10,
  };

  // manage order list completed
  const [ordersListCanceled, setOrdersListCanceled] = useState([]);

  // manage condition
  const [condition, setCondition] = useState({
    ...defaultPagination,
    status: "CANCELED",
  });

  // get all order completed
  const getAllOrders = useCallback(() => {
    dispatch(actionGetAllOrdersCanceled(condition));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, condition.page]);

  // do get all order completed
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition.page]);

  // assign OrdersList completed
  useEffect(() => {
    setOrdersListCanceled(resGetAllOrdersCanceled);

    // console.log('««««« ordersListCanceled »»»»»', ordersListCanceled);

    setCondition((prev) => ({
      ...prev,
      total: resGetAllOrdersCanceled?.total,
      page: resGetAllOrdersCanceled?.page,
      pageSize: resGetAllOrdersCanceled?.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [resGetAllOrdersCanceled]);

  const onChangePage = useCallback((page, pageSize) => {
    setCondition((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  // declare columns of table
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
            <img className="d-block w-100" src={require("assets/images/avatar_2.jpg")} alt="..." />
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
      <div className="cover_table_orderlist">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={ordersListCanceled.payload}
          pagination={false}
        />
      </div>

      <div className="cover_pagination_orderlist">
        <Pagination
          defaultCurrent={1}
          total={condition.total}
          pageSize={condition.pageSize}
          onChange={onChangePage}
          current={condition.page}
        />
      </div>
    </>
  );
}

export default StatusCanceled;
