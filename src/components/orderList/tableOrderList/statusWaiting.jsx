// Table Orders Waiting
// Created by Man Nguyen
// 19/10/2023

import React, { useCallback, useEffect, useState } from "react";
import { Space, Table, Button, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";
import { Link } from "react-router-dom";

import { LOCATIONS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllOrdersWaiting } from "store/Orders/getOrderListWaiting/action";
import "./tableOrderList.scss";
import ArrowDown from "components/svg/arrowDown";

function StatusWaiting() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare resGetAllOrdersWaiting of orderWaitingReducer state
  const resGetAllOrdersWaiting = useSelector(
    (state) => state.orderWaitingReducer.payload
  );

  // declare defaultPagination of get all order completed
  const defaultPagination = {
    total: resGetAllOrdersWaiting?.total || 0,
    page: resGetAllOrdersWaiting?.page || 1,
    pageSize: resGetAllOrdersWaiting?.pageSize || 10,
  };

  // manage order list completed
  const [ordersListWaiting, setOrdersListWaiting] = useState([]);

  // manage condition
  const [condition, setCondition] = useState({
    ...defaultPagination,
    status: "WAITING",
  });

  // get all order completed
  const getAllOrders = useCallback(() => {
    dispatch(actionGetAllOrdersWaiting(condition));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, condition.page]);

  // do get all order completed
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition.page]);

  // assign OrdersList completed
  useEffect(() => {
    setOrdersListWaiting(resGetAllOrdersWaiting);

    // console.log('««««« ordersListWaiting »»»»»', ordersListWaiting);

    setCondition((prev) => ({
      ...prev,
      total: resGetAllOrdersWaiting?.total,
      page: resGetAllOrdersWaiting?.page,
      pageSize: resGetAllOrdersWaiting?.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [resGetAllOrdersWaiting]);

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
            <img
              className="d-block w-100"
              src={require("assets/images/avatar_2.jpg")}
              alt="..."
            />
          </div>

          <div className="cover_cus_name">
            <span>{record?.customer?.fullName}</span>
            <span className="cus_phoneNumber">
              {record?.customer?.phoneNumber}
            </span>
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
    Table.EXPAND_COLUMN,
    // {
    //   title: "Hành động",
    //   key: "actions",
    //   width: "1%",
    //   render: (text, record, index) => {
    //     return (
    //       <Space>
    //         <Button
    //           type="dashed"
    //           icon={<EditOutlined />}
    //           onClick={handleClickFastView(record)}
    //         />
    //       </Space>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div className="cover_table_orderlist">
        <Table
          rowKey="_id"
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div className="order_collapsed">
                {record?.orderDetails?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="row custom_row cover_item_order_collapsed"
                    >
                      <div className="col-8 custom_col cover_img_product_name_category">
                        <div className="cover_img_order_collapsed">
                          <img
                            className="d-block w-100 img_order_collapsed"
                            src={require("assets/images/chuotda.webp")}
                            alt="..."
                          />
                        </div>

                        <div className="cover_product_name_category">
                          <span className="order_collapsed_product_name">
                            {item?.product?.name}
                          </span>

                          <span className="order_collapsed_category">
                            {item?.product?.category?.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-2 custom_col cover_order_collapsed_quantity">
                        <span className="order_collapsed_quantity">
                          x{item?.quantity}
                        </span>
                      </div>

                      <div className="col-2 custom_col cover_order_collapsed_price">
                        <span className="order_collapsed_price">
                          {numeral(item?.price).format("0,0")} VNĐ
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
          }}
          expandIcon={({ expanded, onExpand, record }) =>
            expanded ? (
              <button
                className="btn_collapsed_order"
                onClick={(e) => onExpand(record, e)}
              >
                <ArrowDown />
              </button>
            ) : (
              <button
                className="btn_collapsed_order"
                onClick={(e) => onExpand(record, e)}
              >
                <ArrowDown />
              </button>
            )
          }
          dataSource={ordersListWaiting.payload}
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

export default StatusWaiting;
