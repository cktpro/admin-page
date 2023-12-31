// Table Orders Completed
// Created by Man Nguyen
// 19/10/2023

import React, { useCallback, useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";
import { Link } from "react-router-dom";

import { LOCATIONS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllOrdersCompleted } from "store/Orders/getOrderListCompleted/action";
import "./tableOrderList.scss";
import Loading from "components/svg/loading";
import { formattedMoney } from "helper/formatDocuments";

function StatusCompleted() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare resGetAllOrdersCompleted?.payload of orderCompletedReducer state
  const resGetAllOrdersCompleted = useSelector(
    (state) => state.orderCompletedReducer
  );

  // declare defaultPagination of get all order completed
  const defaultPagination = {
    total: 0,
    page: 1,
    pageSize: 20,
  };

  // manage order list completed
  const [ordersListCompleted, setOrdersListCompleted] = useState([]);

  // manage list customer to filter base customer name
  const [customers, setCustomers] = useState([]);

  // manage list createdDates to filter base createdDates
  const [createdDates, setCreatedDates] = useState([]);

  // manage condition
  const [condition, setCondition] = useState({
    ...defaultPagination,
    status: "COMPLETED",
  });

  // get all order completed
  const getAllOrders = useCallback(() => {
    dispatch(actionGetAllOrdersCompleted(condition));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, condition.page, condition.pageSize]);

  // do get all order completed
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition.page, condition.pageSize]);

  // assign OrdersList completed
  useEffect(() => {
    setOrdersListCompleted(resGetAllOrdersCompleted?.payload);

    // console.log('««««« ordersListCompleted »»»»»', ordersListCompleted);

    setCondition((prev) => ({
      ...prev,
      total:
        resGetAllOrdersCompleted?.payload?.total || defaultPagination.total,
      page: resGetAllOrdersCompleted?.payload?.page || defaultPagination.page,
      pageSize:
        resGetAllOrdersCompleted?.payload?.pageSize ||
        defaultPagination.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [
    defaultPagination.page,
    defaultPagination.pageSize,
    defaultPagination.total,
    resGetAllOrdersCompleted?.payload,
  ]);

  // handle user changed page on antd table
  const onChangePage = useCallback((page, pageSize) => {
    setCondition((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  // to filter customers from orderList
  useEffect(() => {
    const filterCustomer = () => {
      const listCustomer = [];

      ordersListCompleted?.payload?.forEach((item, index) => {
        if (!listCustomer.includes(item.customer.fullName)) {
          listCustomer.push(item.customer.fullName);
        }
      });

      return listCustomer;
    };

    const listCustomer = filterCustomer()?.map((item, index) => {
      return {
        text: item,
        value: item,
      };
    });

    setCustomers(listCustomer);
  }, [ordersListCompleted.payload]);

  // to filter CreatedDate from orderList
  useEffect(() => {
    const filterCreatedDate = () => {
      const listCreatedDate = [];

      ordersListCompleted.payload?.forEach((item, index) => {
        if (!listCreatedDate.includes(item.createdDate)) {
          listCreatedDate.push(item.createdDate);
        }
      });

      return listCreatedDate;
    };

    const listCreatedDate = filterCreatedDate()?.map((item, index) => {
      return {
        text: item.substring(0, 10),
        value: item.substring(0, 10),
      };
    });

    setCreatedDates(listCreatedDate);
  }, [ordersListCompleted.payload]);

  // rendering expandedRowRender content
  const expandedRowRender = useCallback((record) => {
    return (
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
                  ${parseFloat(item?.price).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, []);

  // rerendering expandIcon
  const expandIcon = useCallback(({ expanded, onExpand, record }) => {
    return expanded ? (
      <button
        className="btn_collapsed_order"
        onClick={(e) => onExpand(record, e)}
      >
        <CaretUpOutlined style={{ color: "rgb(99, 115, 129)" }} />
      </button>
    ) : (
      <button
        className="btn_collapsed_order"
        onClick={(e) => onExpand(record, e)}
      >
        <CaretDownOutlined style={{ color: "rgb(99, 115, 129)" }} />
      </button>
    );
  }, []);

  // declare columns of antd table
  const columns = [
    {
      title: "Order",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      render: (text, record, index) => (
        <span className="link_id">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={`${LOCATIONS.ORDER}/${record._id}`}
          >
            {text}
          </Link>
        </span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      filters: customers,
      onFilter: (value, record) =>
        record.customer.fullName.indexOf(value) === 0,
      sorter: (a, b) => a.customer.fullName.localeCompare(b.customer.fullName),
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
      title: "Created date",
      dataIndex: "createdDate",
      key: "createdDate",
      filters: createdDates,
      onFilter: (value, record) => record.createdDate.indexOf(value) === 0,
      sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
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
      sorter: (a, b) => a.orderDetails.length - b.orderDetails.length,
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
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (text, record, index) => (
        <span className="order_totalPrice">
          {formattedMoney(text)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
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

  return resGetAllOrdersCompleted?.isLoading ? (
    <div className="cover_loading">
      <Loading />
    </div>
  ) : (
    <>
      <div className="cover_table_orderlist">
        <Table
          rowKey="_id"
          columns={columns}
          expandable={{
            expandedRowRender,
            expandIcon,
          }}
          dataSource={ordersListCompleted?.payload}
          pagination={false}
        />
      </div>

      <div className="cover_pagination_orderlist">
        <Pagination
          defaultCurrent={1}
          total={condition?.total || defaultPagination.total}
          showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
          pageSize={condition?.pageSize || defaultPagination.pageSize}
          pageSizeOptions={[
            1,
            5,
            10,
            condition?.total || defaultPagination.total,
          ]}
          showSizeChanger
          locale={{ items_per_page: "line / page" }}
          responsive={true}
          onChange={onChangePage}
          current={condition?.page || defaultPagination.page}
        />
      </div>
    </>
  );
}

export default StatusCompleted;
