import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

import "./orderList.scss";
import { LOCATIONS } from "constants/index";
import { listStatus } from "constants/index";
import PathDot from "components/svg/pathDot";
import ArrowLeft from "components/svg/arrowLeft";
import ArrowRight from "components/svg/arrowRight";
import TableOrderList from "./tableOrderList";
import { actionGetAllOrders } from "store/Orders/getOrderList/action";
import { actionGetNumOfOrdersStatus } from "store/Orders/getNumOfStatus/action";
import StatusCompleted from "./tableOrderList/statusCompleted";
import StatusWaiting from "./tableOrderList/statusWaiting";
import StatusCanceled from "./tableOrderList/statusCanceled";
import StatusRejected from "./tableOrderList/statusRejected";
import StatusDelivering from "./tableOrderList/statusDelivering";

function OrderList() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare scrollRef of menu order status
  const scrollRef = useRef(null);

  // declare inputStartDateRef of input start date
  const inputStartDateRef = useRef(null);

  // declare inputEndDateRef of input end date
  const inputEndDateRef = useRef(null);

  // declare resGetAllOrders of orderReducer state
  const resGetAllOrders = useSelector((state) => state.orderReducer.payload);

  // declare resGetNumOfOrdersStatus of getNumOfOrdersStatusReducer state
  const resGetNumOfOrdersStatus = useSelector(
    (state) => state.getNumOfOrdersStatusReducer
  );

  // declare defaultPagination of get all order
  const defaultPagination = {
    total: resGetAllOrders?.total || 0,
    page: resGetAllOrders?.page || 1,
    pageSize: resGetAllOrders?.pageSize || 10,
  };

  // manage order list
  const [ordersList, setOrdersList] = useState([]);

  // currentItem of order status
  const [currentItem, setCurrentItem] = useState("All");

  // manage startDate
  const [startDate, setStartDate] = useState("");

  // manage endDate
  const [endDate, setEndDate] = useState("");

  // manage searchOrder
  const [searchOrder, setSearchOrder] = useState("");

  // manage pagination
  const [pagination, setPagination] = useState(defaultPagination);

  // manage num of orders statuses
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalDelivering, setTotalDelivering] = useState(0);

  // get all order
  const getAllOrders = useCallback(() => {
    dispatch(actionGetAllOrders(pagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.page]);

  // do get all order
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  // assign OrdersList
  useEffect(() => {
    setOrdersList(resGetAllOrders);

    setPagination((prev) => ({
      ...prev,
      total: resGetAllOrders?.total,
      page: resGetAllOrders?.page,
      pageSize: resGetAllOrders?.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [resGetAllOrders]);

  const getNumOfStatus = useCallback(() => {
    dispatch(actionGetNumOfOrdersStatus());
  }, [dispatch]);

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

  // handle onChangePage of pagination
  const onChangePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  // rendering num of order have status = parram
  const renderNumOfStatus = useCallback(
    (status) => {
      switch (status) {
        case "WAITING":
          return totalWaiting;

        case "COMPLETED":
          return totalCompleted;

        case "CANCELED":
          return totalCanceled;

        case "REJECTED":
          return totalRejected;

        case "DELIVERING":
          return totalDelivering;

        default:
          return 0;
      }
    },
    [
      totalCanceled,
      totalCompleted,
      totalDelivering,
      totalRejected,
      totalWaiting,
    ]
  );

  // to trigger arrow scroll
  const handleScroll = useCallback((scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  }, []);

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

  // handle change input filter group
  const handleChangeInput = useCallback((e, label) => {
    console.log("««««« label »»»»»", label);
    if (label === "start_date") {
      setStartDate(e.target.value);
    } else if (label === "end_date") {
      setEndDate(e.target.value);
    } else if (label === "search_order") {
      setSearchOrder(e.target.value);
    }
  }, []);

  // useEffect(() => {
  // console.log('««««« startDate »»»»»', startDate);
  // console.log('««««« endDate »»»»»', endDate);
  // console.log('««««« searchOrder »»»»»', searchOrder);
  // }, [endDate, searchOrder, startDate]);

  const renderOrdersTable = useCallback(() => {
    switch (currentItem) {
      case "All":
        return (
          <>
            <div className="cover_table_orderlist">
              <TableOrderList orderList={ordersList?.payload} />
            </div>

            <div className="cover_pagination_orderlist">
              <Pagination
                defaultCurrent={1}
                total={pagination.total}
                pageSize={pagination.pageSize}
                onChange={onChangePage}
                current={pagination.page}
              />
            </div>
          </>
        );

      case "COMPLETED":
        return <StatusCompleted />;

      case "WAITING":
        return <StatusWaiting />;

      case "CANCELED":
        return <StatusCanceled />;

      case "REJECTED":
        return <StatusRejected />;

      case "DELIVERING":
        return <StatusDelivering />;

      default:
        return null;
    }
  }, [currentItem, onChangePage, ordersList?.payload, pagination.page, pagination.pageSize, pagination.total]);

  return (
    // Order List
    <div className="container-fluid">
      <div className="row custom_row">
        {/* Order List Title */}
        <div className="col-12 custom_col order_list_title">
          Danh sách đơn hàng
        </div>

        {/* Order List Path */}
        <div className="col-12 custom_col order_list_path">
          <span className="order_list_path_dashboard">
            <Link to={LOCATIONS.DASHBOARD}>Dashboard</Link>
          </span>

          <span className="order_list_path_dot">
            <PathDot />
          </span>

          <span className="order_list_path_order">Danh sách đơn hàng</span>
        </div>
      </div>

      {/* Order List Content */}
      <div className="row custom_row">
        <div className="col-12 custom_col cover_order_content">
          <div className="cover_status_menu">
            {/* arrow left */}
            <button
              onClick={() => handleScroll(-150)}
              className="order_menu_arrow_left"
            >
              <ArrowLeft />
            </button>

            {/* menu order status */}
            <ul ref={scrollRef} className="ul_order_status">
              {/* status all */}
              <li
                onClick={() => setCurrentItem("All")}
                className={
                  currentItem === "All"
                    ? "li_order_status_active"
                    : "li_order_status"
                }
              >
                <span
                  className={currentItem === "All" ? "status_all_active" : ""}
                >
                  All
                </span>

                <span className="status_all_num px-1">{ordersList?.total}</span>
              </li>
              {/* to rendering menu status of order */}
              {listStatus.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => setCurrentItem(item)}
                    className={
                      currentItem === item
                        ? "li_order_status_active"
                        : "li_order_status"
                    }
                  >
                    <span
                      className={currentItem === item ? "status_active" : ""}
                    >
                      {item}
                    </span>

                    <span
                      className={`status_num ${
                        currentItem === item ? `${item}_active` : item
                      } ${item} px-1`}
                    >
                      {/* to rendering num of order have status = item */}
                      {renderNumOfStatus(item)}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* arrow right */}
            <button
              onClick={() => handleScroll(150)}
              className="order_menu_arrow_right"
            >
              <ArrowRight />
            </button>
          </div>

          {/* input group */}
          <div className="row custom_row cover_input_group">
            {/* input start date */}
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 custom_col form-floating cover_input">
              <input
                ref={inputStartDateRef}
                type="text"
                className="form-control input_group"
                id="start_date"
                name="start_date"
                placeholder="Ngày bắt đầu"
                onFocus={() => changeType("start_date", "date")}
                onBlur={() => changeType("start_date", "text")}
                onChange={(e) => handleChangeInput(e, "start_date")}
              />

              <label htmlFor="start_date">Ngày bắt đầu</label>
            </div>

            {/* input end date */}
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 custom_col form-floating cover_input">
              <input
                ref={inputEndDateRef}
                type="text"
                className="form-control input_group"
                id="end_date"
                name="end_date"
                placeholder="Ngày kết thúc"
                onFocus={() => changeType("end_date", "date")}
                onBlur={() => changeType("end_date", "text")}
                onChange={(e) => handleChangeInput(e, "end_date")}
              />

              <label htmlFor="end_date">Ngày kết thúc</label>
            </div>

            {/* input search */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 custom_col cover_input">
              <input
                type="text"
                className="form-control orders_input_search"
                id="search_order"
                name="search_order"
                placeholder="Tìm khách hàng hoặc mã đơn hàng..."
                onChange={(e) => handleChangeInput(e, "search_order")}
              />
            </div>
          </div>

          <div className="row custom_row">
            <div className="col-12 custom_col cover_table_orders">
              {renderOrdersTable()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
