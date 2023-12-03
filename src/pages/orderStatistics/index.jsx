// Index Order List
// Created by Man Nguyen
// 19/10/2023

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, Table } from "antd";
import { debounce } from "lodash";

import "./orderStatistics.scss";
import { LOCATIONS } from "constants/index";
import { listStatus } from "constants/index";
import PathDot from "components/svg/pathDot";
import ArrowLeft from "components/svg/arrowLeft";
import ArrowRight from "components/svg/arrowRight";
import { actionGetAllOrders } from "store/Orders/getOrderList/action";
import { actionGetNumOfOrdersStatus } from "store/Orders/getNumOfStatus/action";

import SearchIcon from "components/svg/search";
import {
  actionResetsearchOrders,
  actionsearchOrders,
} from "store/Orders/searchOrders/action";
import CancelIcon from "components/svg/cancel";
import ClearIcon from "components/svg/clear";
import Loading from "components/svg/loading";
import { axiosAdminMan } from "helper/axios";
import dayjs from "dayjs";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

function OrderStatisticsPage() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare scrollRef of menu order status
  const scrollRef = useRef(null);

  // declare inputStartDateRef of input start date
  const inputStartDateRef = useRef(null);

  // declare inputEndDateRef of input end date
  const inputEndDateRef = useRef(null);

  // declare inputSearchRef of input search orders
  const inputSearchRef = useRef(null);

  // declare resGetAllOrders.payload of orderReducer state
  const resGetAllOrders = useSelector((state) => state.orderReducer);

  // declare resGetNumOfOrdersStatus of getNumOfOrdersStatusReducer state
  const resGetNumOfOrdersStatus = useSelector(
    (state) => state.getNumOfOrdersStatusReducer
  );

  // declare resSearchOrders?.payload of searchOrdersReducer state
  const resSearchOrders = useSelector((state) => state.searchOrdersReducer);

  // declare defaultPagination of get all order
  const defaultPagination = {
    total: 0,
    page: 1,
    pageSize: 20,
  };

  // declare defaultPaginationSearchOrders of search orders
  const defaultPaginationSearchOrders = {
    total: 0,
    page: 1,
    pageSize: 20,
  };

  const [status, setStatus] = useState("");

  const [customers, setCustomers] = useState([]);

  const [total, setTotal] = useState([]);

  // manage order list
  const [ordersList, setOrdersList] = useState([]);

  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);

  // manage order search list
  const [ordersSearchList, setOrdersSearchList] = useState([]);

  // manage startDate
  const [startDate, setStartDate] = useState("");

  // manage endDate
  const [endDate, setEndDate] = useState("");

  // manage input search Order
  const [searchOrder, setSearchOrder] = useState("");

  // manage user is doing search or not
  const [isDoSearchOrder, setIsDoSearchOrder] = useState(false);

  // manage pagination
  const [pagination, setPagination] = useState(defaultPagination);

  // manage num of orders statuses
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalDelivering, setTotalDelivering] = useState(0);

  const [createdDates, setCreatedDates] = useState([]);

  const calTotal = useCallback(() => {
    let sub = 0;

    ordersList.forEach((item) => {
      console.log("««««« item.totalPrice »»»»»", item.totalPrice);
      sub += parseFloat(item.totalPrice);
    });

    setTotal(sub);
  }, [ordersList]);

  useEffect(() => {
    calTotal();
  }, [calTotal, ordersList]);

  // get all order
  const getAllOrders = useCallback(() => {
    dispatch(actionGetAllOrders(pagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.page, pagination.pageSize]);

  // to filter customers from orderList
  useEffect(() => {
    const filterCustomer = () => {
      const listCustomer = [];

      ordersList?.payload?.forEach((item, index) => {
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
  }, [ordersList?.payload]);

  // to filter CreatedDate from orderList
  useEffect(() => {
    const filterCreatedDate = () => {
      const listCreatedDate = [];

      ordersList?.payload?.forEach((item, index) => {
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
  }, [ordersList?.payload]);

  // get num of all order status be render on menu status (num next to status)
  const getNumOfStatus = useCallback(() => {
    dispatch(actionGetNumOfOrdersStatus());
  }, [dispatch]);

  // getNumOfStatus when first load
  useEffect(() => {
    getNumOfStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalWaiting(resGetNumOfOrdersStatus?.payload?.totalWaiting);
    setTotalCompleted(resGetNumOfOrdersStatus?.payload?.totalCompleted);
    setTotalCanceled(resGetNumOfOrdersStatus?.payload?.totalCanceled);
    setTotalRejected(resGetNumOfOrdersStatus?.payload?.totalRejected);
    setTotalDelivering(resGetNumOfOrdersStatus?.payload?.totalDelivering);
  }, [
    resGetNumOfOrdersStatus?.payload?.totalCanceled,
    resGetNumOfOrdersStatus?.payload?.totalCompleted,
    resGetNumOfOrdersStatus?.payload?.totalDelivering,
    resGetNumOfOrdersStatus?.payload?.totalRejected,
    resGetNumOfOrdersStatus?.payload?.totalWaiting,
  ]);

  // to change type of input base label
  const changeType = useCallback((label, type) => {
    if (label === "start_date") {
      if (inputStartDateRef.current) {
        inputStartDateRef.current.type = type;
      }
    } else if (label === "end_date") {
      if (inputEndDateRef.current) {
        inputEndDateRef.current.type = type;
      }
    }
  }, []);

  const getRevenue = useCallback(async () => {
    try {
      let startDateY = new dayjs().subtract(1, "day").format("YYYY-MM-DD");
      let endDateY = new dayjs().subtract(1, "day").format("YYYY-MM-DD");
      const urlY = `/query-orders/getRevenue?endDate=${startDateY}&startDate=${endDateY}`;

      let startDateT = new dayjs().format("YYYY-MM-DD");
      let endDateT = new dayjs().format("YYYY-MM-DD");
      const urlT = `/query-orders/getRevenue?endDate=${startDateT}&startDate=${endDateT}`;

      const [resGetRevenueY, resGetRevenueT] = await Promise.all([
        axiosAdminMan.get(urlY),
        axiosAdminMan.get(urlT),
      ]);

      setYesterdayRevenue(resGetRevenueY.data.payload[0].total);
      setTodayRevenue(resGetRevenueT.data.payload[0].total);
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  }, []);

  useEffect(() => {
    getRevenue();
  }, [getRevenue]);

  const doQuery = useCallback(async () => {
    const url = `/query-orders/getOrder?endDate=${endDate}&startDate=${startDate}&status=${status}`;

    let resQuery = await axiosAdminMan.get(url);

    setOrdersList(resQuery.data.payload);

    console.log("««««« resQuery.data »»»»»", resQuery.data);
  }, [endDate, startDate, status]);

  useEffect(() => {
    doQuery();
  }, [doQuery, status, startDate, endDate]);

  // asign Input To State base label using debounce to delay 1s before run
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const asignInputToState = useCallback(
    debounce((label, value) => {
      if (label === "start_date") {
        setStartDate(value);
      } else if (label === "end_date") {
        setEndDate(value);
      } else if (label === "search_order") {
        setSearchOrder(value);
      }
    }, 1000),
    []
  );

  // handle change input filter group
  const handleChangeInput = useCallback(
    (e, label) => {
      if (label === "start_date") {
        const value = e.target.value;

        asignInputToState(label, value);
      } else if (label === "end_date") {
        const value = e.target.value;

        asignInputToState(label, value);
      }
    },
    [asignInputToState]
  );

  useEffect(() => {
    console.log("««««« status »»»»»", status);
  }, [status]);

  useEffect(() => {
    console.log("««««« startDate »»»»»", startDate);
  }, [startDate]);

  useEffect(() => {
    console.log("««««« endDate »»»»»", endDate);
  }, [endDate]);

  // declare columns of antd table
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
                    src={item?.product?.image?.location}
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
                <span className="order_collapsed_price">${item?.price}</span>
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
        <span className="order_totalPrice">${parseFloat(text).toFixed(2)}</span>
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

  return (
    // Order List
    <div className="container-fluid">
      <div className="row custom_row">
        {/* Order List Title */}
        <div className="col-12 custom_col order_list_title">
          Order statistics
        </div>

        {/* Order List Path */}
        <div className="col-12 custom_col order_list_path">
          <span className="order_list_path_dashboard">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={LOCATIONS.DASHBOARD}
            >
              Dashboard
            </Link>
          </span>

          <span className="order_list_path_dot">
            <PathDot />
          </span>

          <span className="order_list_path_order">Order statistics</span>
        </div>
      </div>

      {/* Order List Content */}
      <div className="row custom_row">
        <div className="col-12 custom_col cover_order_content">
          <div className="cover_revenue">
            <span className="yesterday">
              Yesterday's Revenue:{" "}
              <span>${parseFloat(yesterdayRevenue).toFixed(2)}</span>
            </span>
            <span className="today">
              Today's Revenue:{" "}
              <span className="today_number">
                ${parseFloat(todayRevenue).toFixed(2)}
              </span>
            </span>
          </div>

          <ul className="ul_statistics">
            <li
              className={status === "" ? "li_active" : ""}
              onClick={() => setStatus("")}
              value="All"
            >
              All Order
            </li>
            <li
              className={status === "PAID" ? "li_active" : ""}
              onClick={() => setStatus("PAID")}
              value="PAID"
            >
              Paid
            </li>
            <li
              className={status === "COMPLETED" ? "li_active" : ""}
              onClick={() => setStatus("COMPLETED")}
              value="COMPLETED"
            >
              Completed
            </li>
            <li
              className={status === "WAITING" ? "li_active" : ""}
              onClick={() => setStatus("WAITING")}
              value="WAITING"
            >
              Waiting
            </li>
            <li
              className={status === "CANCELED" ? "li_active" : ""}
              onClick={() => setStatus("CANCELED")}
              value="CANCELED"
            >
              Canceled
            </li>
            <li
              className={status === "REJECTED" ? "li_active" : ""}
              onClick={() => setStatus("REJECTED")}
              value="REJECTED"
            >
              Rejected
            </li>
            <li
              className={status === "DELIVERING" ? "li_active" : ""}
              onClick={() => setStatus("DELIVERING")}
              value="DELIVERING"
            >
              Delivering
            </li>
          </ul>

          {/* render order table */}
          <div className="row custom_row">
            {/* input group */}
            <div className="row custom_row cover_input_group">
              {/* input start date */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 custom_col form-floating cover_input">
                <input
                  ref={inputStartDateRef}
                  type="text"
                  className={`form-control input_group`}
                  id="start_date"
                  name="start_date"
                  placeholder="From date"
                  onFocus={() => changeType("start_date", "date")}
                  onBlur={() => {
                    changeType("start_date", "text");
                  }}
                  onChange={(e) => {
                    handleChangeInput(e, "start_date");
                  }}
                />

                <label className="label_input_group" htmlFor="start_date">
                  From date
                </label>

                {/* {isErrorInfo("start_date") && (
                <div className="input_error">
                  {validation.errors.start_date}
                </div>
              )} */}
              </div>

              {/* input end date */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 custom_col form-floating cover_input">
                <input
                  ref={inputEndDateRef}
                  type="text"
                  className={`form-control input_group`}
                  id="end_date"
                  name="end_date"
                  placeholder="To date"
                  onFocus={() => changeType("end_date", "date")}
                  onBlur={() => {
                    changeType("end_date", "text");
                  }}
                  onChange={(e) => {
                    handleChangeInput(e, "end_date");
                  }}
                />

                <label className="label_input_group" htmlFor="end_date">
                  To date
                </label>
              </div>
            </div>

            <div className="col-12 custom_col cover_table_orders">
              <Table
                rowKey="_id"
                columns={columns}
                expandable={{
                  expandedRowRender,
                  expandIcon,
                }}
                dataSource={ordersList}
                pagination={false}
              />

              <div className="cover_total">
                <span className="today">
                  Total:{" "}
                  <span className="today_number">
                    ${parseFloat(total).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatisticsPage;
