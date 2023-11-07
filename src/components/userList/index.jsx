// Index user List
// Created by Man Nguyen
// 19/10/2023

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { debounce } from "lodash";

import "./userList.scss";
import { LOCATIONS } from "constants/index";
import { listStatus } from "constants/index";
import PathDot from "components/svg/pathDot";
import ArrowLeft from "components/svg/arrowLeft";
import ArrowRight from "components/svg/arrowRight";
import TableUserList from "./tableUserList";
import { actionGetAllUsers } from "users/Users/getUserList/action";
import { actionGetNumOfUsersStatus } from "users/Users/getNumOfStatus/action";
import StatusCompleted from "./tableUserList/statusCompleted";
import StatusWaiting from "./tableUserList/statusWaiting";
import StatusCanceled from "./tableUserList/statusCanceled";
import StatusRejected from "./tableUserList/statusRejected";
import StatusDelivering from "./tableUserList/statusDelivering";
import SearchIcon from "components/svg/search";
import {
  actionResetsearchUsers,
  actionsearchUsers,
} from "users/Users/searchUser/action";
import SearchUserResult from "./tableUserList/searchUserResult";
import CancelIcon from "components/svg/cancel";
import ClearIcon from "components/svg/clear";
import Loading from "components/svg/loading";

function UserList() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare scrollRef of menu User status
  const scrollRef = useRef(null);

  // declare inputStartDateRef of input start date
  const inputStartDateRef = useRef(null);

  // declare inputEndDateRef of input end date
  const inputEndDateRef = useRef(null);

  // declare inputSearchRef of input search user
  const inputSearchRef = useRef(null);

  // declare resGetAllUser.payload of userReducer state
  const resGetAllUser = useSelector((state) => state.userReducer);

  // declare resGetNumOfUserStatus of getNumOfUserStatusReducer state
  const resGetNumOfUserStatus = useSelector(
    (state) => state.getNumOfUserStatusReducer
  );

  // declare resSearchUser?.payload of searchUserReducer state
  const resSearchUser = useSelector((state) => state.searchUserReducer);

  // declare defaultPagination of get all user
  const defaultPagination = {
    total: 0,
    page: 1,
    pageSize: 20,
  };

  // declare defaultPaginationSearchUser of search user
  const defaultPaginationSearchUser = {
    total: 0,
    page: 1,
    pageSize: 20,
  };

  // manage user list
  const [userList, setUserList] = useState([]);

  // manage User search list
  const [userSearchList, setUserSearchList] = useState([]);

  // currentItem of user status
  const [currentItem, setCurrentItem] = useState("All");

  // manage startDate
  const [startDate, setStartDate] = useState("");

  // manage endDate
  const [endDate, setEndDate] = useState("");

  // manage input search User
  const [searchUser, setSearchUser] = useState("");

  // manage user is doing search or not
  const [isDoSearchUser, setIsDoSearchUser] = useState(false);

  // manage pagination
  const [pagination, setPagination] = useState(defaultPagination);

  // manage num of user statuses
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalDelivering, setTotalDelivering] = useState(0);

  // validate startDate and EndDate

  // get all user
  const getAllUser = useCallback(() => {
    dispatch(actionGetAllUsers(pagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.page, pagination.pageSize]);

  // do get all user
  useEffect(() => {
    // handle first load and user click cancel on condition find status when searchUser = null
    if (
      currentItem === "All" &&
      searchUser === "" &&
      startDate === "" &&
      endDate === ""
    ) {
      getAllUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, currentItem]);

  // assign UserList
  useEffect(() => {
    setUserList(resGetAllUser?.payload);

    setPagination((prev) => ({
      ...prev,
      total: resGetAllUser?.payload?.total || defaultPagination.total,
      page: resGetAllUser?.payload?.page || defaultPagination.page,
      pageSize:
        resGetAllUser?.payload?.pageSize || defaultPagination.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [
    defaultPagination.page,
    defaultPagination.pageSize,
    defaultPagination.total,
    resGetAllUser?.payload,
  ]);

  // get num of all user status be render on menu status (num next to status)
  const getNumOfStatus = useCallback(() => {
    dispatch(actionGetNumOfUsersStatus());
  }, [dispatch]);

  // getNumOfStatus when first load
  useEffect(() => {
    getNumOfStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalWaiting(resGetNumOfUserStatus?.payload?.totalWaiting);
    setTotalCompleted(resGetNumOfUserStatus?.payload?.totalCompleted);
    setTotalCanceled(resGetNumOfUserStatus?.payload?.totalCanceled);
    setTotalRejected(resGetNumOfUserStatus?.payload?.totalRejected);
    setTotalDelivering(resGetNumOfUserStatus?.payload?.totalDelivering);
  }, [
    resGetNumOfUserStatus?.payload?.totalCanceled,
    resGetNumOfUserStatus?.payload?.totalCompleted,
    resGetNumOfUserStatus?.payload?.totalDelivering,
    resGetNumOfUserStatus?.payload?.totalRejected,
    resGetNumOfUserStatus?.payload?.totalWaiting,
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
  const doSearchUser = useCallback(
    (conditionFind) => {
      dispatch(actionsearchUsers(conditionFind));

      setIsDoSearchUser(true);
    },
    [dispatch]
  );

  // handle onChangePageSearch of pagination
  const onChangePageSearch = useCallback(
    (page, pageSize) => {
      const conditionFind = {
        status: currentItem,
        query: searchUser,
        startDate: startDate,
        endDate: endDate,
        page: page,
        pageSize: pageSize,
      };

      doSearchUser(conditionFind);
    },
    [currentItem, doSearchUser, endDate, searchUser, startDate]
  );

  // rendering num of user have status = parram
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
      } else if (label === "search_user") {
        setSearchUser(value);
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
      } else if (label === "search_user") {
        const value = e.target.value;

        asignInputToState(label, value);
      }
    },
    [asignInputToState]
  );

  // to render table user base currentItem of user status and search user result
  const renderUserTable = useCallback(() => {
    if (isDoSearchUser) {
      return (
        <>
          <SearchUserResult searchResult={userSearchList} />

          <div className="cover_pagination_userlist">
            <Pagination
              defaultCurrent={1}
              total={
                resSearchUser?.payload?.total ||
                defaultPaginationSearchUser.total
              }
              showTotal={(total, range) =>
                `${range[0]} - ${range[1]} của ${total}`
              }
              pageSize={
                resSearchUser?.payload?.pageSize ||
                defaultPaginationSearchUser.pageSize
              }
              pageSizeOptions={[
                1,
                5,
                10,
                resSearchUser?.payload?.total || 20,
              ]}
              showSizeChanger
              locale={{ items_per_page: "dòng / trang" }}
              responsive={true}
              onChange={onChangePageSearch}
              current={
                resSearchUser?.payload?.page ||
                defaultPaginationSearchUser.page
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
            <div className="cover_table_userlist">
              <TableUserList userList={userList?.payload} />
            </div>

            <div className="cover_pagination_userlist">
              <Pagination
                defaultCurrent={1}
                total={
                  resGetAllUser?.payload?.total || defaultPagination.total
                }
                showTotal={(total, range) =>
                  `${range[0]} - ${range[1]} của ${total}`
                }
                pageSize={
                  resGetAllUser?.payload?.pageSize ||
                  defaultPagination.pageSize
                }
                pageSizeOptions={[
                  1,
                  5,
                  10,
                  resGetAllUser?.payload?.total || 20,
                ]}
                showSizeChanger //show button change page size
                locale={{ items_per_page: "dòng / trang" }}
                responsive={true}
                onChange={onChangePage}
                current={
                  resGetAllUser?.payload?.page || defaultPagination.page
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
    defaultPaginationSearchUser.page,
    defaultPaginationSearchUser.pageSize,
    defaultPaginationSearchUser.total,
    isDoSearchUser,
    onChangePage,
    onChangePageSearch,
    userList?.payload,
    userSearchList,
    resGetAllUser?.payload?.page,
    resGetAllUser?.payload?.pageSize,
    resGetAllUser?.payload?.total,
    resSearchUser?.payload?.page,
    resSearchUser?.payload?.pageSize,
    resSearchUser?.payload?.total,
  ]);

  // handle click status on menu user
  const handleClickStatus = useCallback(
    (item) => {
      setCurrentItem(item);
      setIsDoSearchUser(false);
      inputStartDateRef.current.value = "";
      inputEndDateRef.current.value = "";
      inputSearchRef.current.value = "";
      setSearchUser("");
      setStartDate("");
      setEndDate("");
      dispatch(actionResetsearchUsers());
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
    if (searchUser !== "" || startDate !== "" || endDate !== "") {
      const conditionFind = {
        status: currentItem,
        query: searchUser,
        startDate: startDate,
        endDate: endDate,
        page: defaultPaginationSearchUser.page,
        pageSize: defaultPaginationSearchUser.pageSize,
      };

      doSearchUser(conditionFind);
    } else {
      dispatch(actionResetsearchUsers());

      setIsDoSearchUser(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentItem,
    startDate,
    endDate,
    searchUser,
    dispatch,
    doSearchUser,
    getAllUser,
  ]);

  // setUserSearchList when resSearchUser?.payload is changed
  useEffect(() => {
    if (
      resSearchUser?.payload.payload &&
      resSearchUser?.payload.payload.length > 0
    ) {
      setUserSearchList(resSearchUser?.payload);
    } else {
      dispatch(actionResetsearchUsers());

      setUserSearchList(resSearchUser?.payload);
    }
  }, [dispatch, resSearchUser?.payload]);

  // handle click clear btn
  const handleClickClear = useCallback(() => {
    setCurrentItem("All");
    setIsDoSearchUser(false);
    inputStartDateRef.current.value = "";
    inputEndDateRef.current.value = "";
    inputSearchRef.current.value = "";
    setSearchUser("");
    setStartDate("");
    setEndDate("");
    dispatch(actionResetsearchUsers());
  }, [dispatch]);

  return (
    // User List
    <div className="container-fluid">
      <div className="row custom_row">
        {/* User List Title */}
        <div className="col-12 custom_col user_list_title">
          Danh sách người dùng
        </div>

        {/* User List Path */}
        <div className="col-12 custom_col user_list_path">
          <span className="user_list_path_dashboard">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={LOCATIONS.DASHBOARD}
            >
              Dashboard
            </Link>
          </span>

          <span className="user_list_path_dot">
            <PathDot />
          </span>

          <span className="user_list_path_user">Danh sách người dùng</span>
        </div>
      </div>

      {/* User List Content */}
      <div className="row custom_row">
        <div className="col-12 custom_col cover_user_content">
          <div className="cover_status_menu">
            {/* arrow left */}
            <button
              onClick={() => handleScroll(-150)}
              className="user_menu_arrow_left"
            >
              <ArrowLeft />
            </button>

            {/* menu User status */}
            <ul ref={scrollRef} className="ul_user_status">
              {/* status all */}
              <li
                onClick={() => handleClickStatus("All")}
                className={
                  currentItem === "All"
                    ? "li_user_status_active"
                    : "li_user_status"
                }
              >
                <span
                  className={currentItem === "All" ? "status_all_active" : ""}
                >
                  All
                </span>

                <span className="status_all_num px-1">{userList?.total}</span>
              </li>
              {/* to rendering menu status of User */}
              {listStatus.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleClickStatus(item)}
                    className={
                      currentItem === item
                        ? "li_user_status_active"
                        : "li_user_status"
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
                      {/* to rendering num of User have status = item */}
                      {renderNumOfStatus(item)}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* arrow right */}
            <button
              onClick={() => handleScroll(150)}
              className="user_menu_arrow_right"
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
                placeholder="Từ ngày"
                onFocus={() => changeType("start_date", "date")}
                onBlur={() => {
                  changeType("start_date", "text");
                }}
                onChange={(e) => {
                  handleChangeInput(e, "start_date");
                }}
              />

              <label className="label_input_group" htmlFor="start_date">
                Từ ngày
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
                placeholder="Đến ngày"
                onFocus={() => changeType("end_date", "date")}
                onBlur={() => {
                  changeType("end_date", "text");
                }}
                onChange={(e) => {
                  handleChangeInput(e, "end_date");
                }}
              />

              <label className="label_input_group" htmlFor="end_date">
                Đến ngày
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
                className="form-control users_input_search"
                id="search_user"
                name="search_user"
                placeholder="Tìm số điện thoại hoặc mã đơn hàng..."
                onChange={(e) => handleChangeInput(e, "search_user")}
              />
            </div>
          </div>

          {/* handle if user is doing search or not then reder this base it */}
          {isDoSearchUser ? (
            <div className="row custom_row">
              <div className="col-12 custom_col num_of_result">
                <span>
                  Tìm thấy <b>{resSearchUser?.payload?.total || 0}</b> kết quả
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

                  {isDoSearchUser && (
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

          {/* render User table */}
          {/* <div className="row custom_row">
            <div className="col-12 custom_col cover_table_user">
              {resGetAllUser?.isLoading || resSearchUser.isLoading ? (
                <div className="cover_loading">
                  <Loading />
                </div>
              ) : (
                renderUserTable()
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserList;
