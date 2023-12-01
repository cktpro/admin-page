// Index Order List
// Created by Man Nguyen
// 19/10/2023

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { debounce } from "lodash";

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
import SearchIcon from "components/svg/search";
import {
  actionResetsearchOrders,
  actionsearchOrders,
} from "store/Orders/searchOrders/action";
import SearchOrderResult from "./tableOrderList/searchOrdersResult";
import CancelIcon from "components/svg/cancel";
import ClearIcon from "components/svg/clear";
import Loading from "components/svg/loading";

function OrderList() {
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

  // manage order list
  const [ordersList, setOrdersList] = useState([]);

  // manage order search list
  const [ordersSearchList, setOrdersSearchList] = useState([]);

  // currentItem of order status
  const [currentItem, setCurrentItem] = useState("All");

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

  // validate startDate and EndDate

  // get all order
  const getAllOrders = useCallback(() => {
    dispatch(actionGetAllOrders(pagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.page, pagination.pageSize]);

  // do get all order
  useEffect(() => {
    // handle first load and user click cancel on condition find status when searchOrder = null
    if (
      currentItem === "All" &&
      searchOrder === "" &&
      startDate === "" &&
      endDate === ""
    ) {
      getAllOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, currentItem]);

  // assign OrdersList
  useEffect(() => {
    setOrdersList(resGetAllOrders?.payload);

    setPagination((prev) => ({
      ...prev,
      total: resGetAllOrders?.payload?.total || defaultPagination.total,
      page: resGetAllOrders?.payload?.page || defaultPagination.page,
      pageSize:
        resGetAllOrders?.payload?.pageSize || defaultPagination.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [
    defaultPagination.page,
    defaultPagination.pageSize,
    defaultPagination.total,
    resGetAllOrders?.payload,
  ]);

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

  // handle onChangePage of pagination
  const onChangePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  // handle handle Search When Click Cancel on condition find status
  const doSearchOrders = useCallback(
    (conditionFind) => {
      dispatch(actionsearchOrders(conditionFind));

      setIsDoSearchOrder(true);
    },
    [dispatch]
  );

  // handle onChangePageSearch of pagination
  const onChangePageSearch = useCallback(
    (page, pageSize) => {
      const conditionFind = {
        status: currentItem,
        query: searchOrder,
        startDate: startDate,
        endDate: endDate,
        page: page,
        pageSize: pageSize,
      };

      doSearchOrders(conditionFind);
    },
    [currentItem, doSearchOrders, endDate, searchOrder, startDate]
  );

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
      } else if (label === "search_order") {
        const value = e.target.value;

        asignInputToState(label, value);
      }
    },
    [asignInputToState]
  );

  // to render table order base currentItem of order status and search orders result
  const renderOrdersTable = useCallback(() => {
    if (isDoSearchOrder) {
      return (
        <>
          <SearchOrderResult searchResult={ordersSearchList} />

          <div className="cover_pagination_orderlist">
            <Pagination
              defaultCurrent={1}
              total={
                resSearchOrders?.payload?.total ||
                defaultPaginationSearchOrders.total
              }
              showTotal={(total, range) =>
                `${range[0]} - ${range[1]} of ${total}`
              }
              pageSize={
                resSearchOrders?.payload?.pageSize ||
                defaultPaginationSearchOrders.pageSize
              }
              pageSizeOptions={[
                1,
                5,
                10,
                resSearchOrders?.payload?.total || 20,
              ]}
              showSizeChanger
              locale={{ items_per_page: "line / page" }}
              responsive={true}
              onChange={onChangePageSearch}
              current={
                resSearchOrders?.payload?.page ||
                defaultPaginationSearchOrders.page
              }
            />
          </div>
        </>
      );
    }

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
                total={
                  resGetAllOrders?.payload?.total || defaultPagination.total
                }
                showTotal={(total, range) =>
                  `${range[0]} - ${range[1]} of ${total}`
                }
                pageSize={
                  resGetAllOrders?.payload?.pageSize ||
                  defaultPagination.pageSize
                }
                pageSizeOptions={[
                  1,
                  5,
                  10,
                  resGetAllOrders?.payload?.total || 20,
                ]}
                showSizeChanger //show button change page size
                locale={{ items_per_page: "line / page" }}
                responsive={true}
                onChange={onChangePage}
                current={
                  resGetAllOrders?.payload?.page || defaultPagination.page
                }
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
  }, [
    currentItem,
    defaultPagination.page,
    defaultPagination.pageSize,
    defaultPagination.total,
    defaultPaginationSearchOrders.page,
    defaultPaginationSearchOrders.pageSize,
    defaultPaginationSearchOrders.total,
    isDoSearchOrder,
    onChangePage,
    onChangePageSearch,
    ordersList?.payload,
    ordersSearchList,
    resGetAllOrders?.payload?.page,
    resGetAllOrders?.payload?.pageSize,
    resGetAllOrders?.payload?.total,
    resSearchOrders?.payload?.page,
    resSearchOrders?.payload?.pageSize,
    resSearchOrders?.payload?.total,
  ]);

  // handle click status on menu order
  const handleClickStatus = useCallback(
    (item) => {
      setCurrentItem(item);
      setIsDoSearchOrder(false);
      inputStartDateRef.current.value = "";
      inputEndDateRef.current.value = "";
      inputSearchRef.current.value = "";
      setSearchOrder("");
      setStartDate("");
      setEndDate("");
      dispatch(actionResetsearchOrders());
    },
    [dispatch]
  );

  // handle click cancel on condition find status
  const handleClickCancelOnStatus = useCallback(() => {
    setCurrentItem("All");
  }, []);

  // handle click cancel on condition find StartDate
  const handleClickCancelOnStartDate = useCallback(() => {
    setStartDate("");
    inputStartDateRef.current.value = "";
  }, []);

  // handle click cancel on condition find EndDate
  const handleClickCancelOnEndDate = useCallback(() => {
    setEndDate("");
    inputEndDateRef.current.value = "";
  }, []);

  // update conditionFind and do search when currentItem and input search is changed
  useEffect(() => {
    if (searchOrder !== "" || startDate !== "" || endDate !== "") {
      const conditionFind = {
        status: currentItem,
        query: searchOrder,
        startDate: startDate,
        endDate: endDate,
        page: defaultPaginationSearchOrders.page,
        pageSize: defaultPaginationSearchOrders.pageSize,
      };

      doSearchOrders(conditionFind);
    } else {
      dispatch(actionResetsearchOrders());

      setIsDoSearchOrder(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentItem,
    startDate,
    endDate,
    searchOrder,
    dispatch,
    doSearchOrders,
    getAllOrders,
  ]);

  // setOrdersSearchList when resSearchOrders?.payload is changed
  useEffect(() => {
    if (
      resSearchOrders?.payload.payload &&
      resSearchOrders?.payload.payload.length > 0
    ) {
      setOrdersSearchList(resSearchOrders?.payload);
    } else {
      dispatch(actionResetsearchOrders());

      setOrdersSearchList(resSearchOrders?.payload);
    }
  }, [dispatch, resSearchOrders?.payload]);

  // handle click clear btn
  const handleClickClear = useCallback(() => {
    setCurrentItem("All");
    setIsDoSearchOrder(false);
    inputStartDateRef.current.value = "";
    inputEndDateRef.current.value = "";
    inputSearchRef.current.value = "";
    setSearchOrder("");
    setStartDate("");
    setEndDate("");
    dispatch(actionResetsearchOrders());
  }, [dispatch]);

  return (
    // Order List
    <div className="container-fluid">
      <div className="row custom_row">
        {/* Order List Title */}
        <div className="col-12 custom_col order_list_title">
          Order list
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

          <span className="order_list_path_order">Order list</span>
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
                onClick={() => handleClickStatus("All")}
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
                    onClick={() => handleClickStatus(item)}
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

              {/* {isErrorInfo("end_date") && (
                <div className="input_error">{validation.errors.end_date}</div>
              )} */}
            </div>

            {/* input search */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 custom_col cover_input cover_input_search">
              <div className="search_icon">
                <SearchIcon />
              </div>

              <input
                ref={inputSearchRef}
                type="text"
                className="form-control orders_input_search"
                id="search_order"
                name="search_order"
                placeholder="Search phone number or order ID..."
                onChange={(e) => handleChangeInput(e, "search_order")}
              />
            </div>
          </div>

          {/* handle if user is doing search or not then reder this base it */}
          {isDoSearchOrder ? (
            <div className="row custom_row">
              <div className="col-12 custom_col num_of_result">
                <span>
                  Tìm thấy <b>{resSearchOrders?.payload?.total || 0}</b> kết quả
                </span>
              </div>
            </div>
          ) : (
            currentItem !== "All" && (
              <div className="row custom_row">
                <div className="col-12 custom_col num_of_result">
                  <span>
                    Tìm thấy <b>{renderNumOfStatus(currentItem) || 0} </b> kết
                    quả
                  </span>
                </div>
              </div>
            )
          )}

          {/* handle render condition find when status = "All" or not */}
          {currentItem !== "All" ? (
            <div className="row custom_row">
              <div className="col-12 custom_col condition_find">
                <div className="cover_condition_list">
                  <div className="cover_condition_find_status">
                    Status:{" "}
                    <span>
                      {currentItem}{" "}
                      <div
                        onClick={handleClickCancelOnStatus}
                        className="cover_cancel_icon"
                      >
                        <CancelIcon />
                      </div>
                    </span>
                  </div>

                  {startDate !== "" && (
                    <div className="cover_condition_find_date">
                      Start Date:{" "}
                      <span>
                        {startDate}
                        <div
                          onClick={handleClickCancelOnStartDate}
                          className="cover_cancel_icon"
                        >
                          <CancelIcon />
                        </div>
                      </span>
                    </div>
                  )}

                  {endDate !== "" && (
                    <div className="cover_condition_find_date">
                      End Date:{" "}
                      <span>
                        {endDate}
                        <div
                          onClick={handleClickCancelOnEndDate}
                          className="cover_cancel_icon"
                        >
                          <CancelIcon />
                        </div>
                      </span>
                    </div>
                  )}

                  <div onClick={handleClickClear} className="cover_btn_clear">
                    <div className="btn_clear">
                      <ClearIcon /> <span>Clear</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row custom_row">
              <div className="col-12 custom_col condition_find">
                <div className="cover_condition_list">
                  {startDate !== "" && (
                    <div className="cover_condition_find_date">
                      Start Date:{" "}
                      <span>
                        {startDate}
                        <div
                          onClick={handleClickCancelOnStartDate}
                          className="cover_cancel_icon"
                        >
                          <CancelIcon />
                        </div>
                      </span>
                    </div>
                  )}

                  {endDate !== "" && (
                    <div className="cover_condition_find_date">
                      End Date:{" "}
                      <span>
                        {endDate}
                        <div
                          onClick={handleClickCancelOnEndDate}
                          className="cover_cancel_icon"
                        >
                          <CancelIcon />
                        </div>
                      </span>
                    </div>
                  )}

                  {isDoSearchOrder && (
                    <div onClick={handleClickClear} className="cover_btn_clear">
                      <div className="btn_clear">
                        <ClearIcon /> <span>Clear</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* render order table */}
          <div className="row custom_row">
            <div className="col-12 custom_col cover_table_orders">
              {resGetAllOrders?.isLoading || resSearchOrders.isLoading ? (
                <div className="cover_loading">
                  <Loading />
                </div>
              ) : (
                renderOrdersTable()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
