// Table User Rejected
// Created by Hung dev
// 07/11/2023

import React, { useCallback, useEffect, useState } from "react";
import { Space, Table, Button, Pagination } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
} from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";
import { Link } from "react-router-dom";

import { LOCATIONS } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllUsersRejected } from "users/Users/getUserListRejected/action";
import "./tableUserList.scss";
import ArrowDown from "components/svg/arrowDown";
import Loading from "components/svg/loading";

function StatusRejected() {
  // declare useDispatch
  const dispatch = useDispatch();

  // declare resGetAllUserRejected?.payload of userRejectedReducer state
  const resGetAllUserRejected = useSelector(
    (state) => state.userRejectedReducer
  );

  // declare defaultPagination of get all user completed
  const defaultPagination = {
    total: 0,
    page: 1,
    pageSize: 20,
  };

  // manage user list completed
  const [userListRejected, setUserListRejected] = useState([]);

  // manage condition
  const [condition, setCondition] = useState({
    ...defaultPagination,
    status: "REJECTED",
  });

  // get all user completed
  const getAllUser = useCallback(() => {
    dispatch(actionGetAllUsersRejected(condition));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, condition.page, condition.pageSize]);

  // do get all user completed
  useEffect(() => {
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition.page, condition.pageSize]);

  // assign UserList completed
  useEffect(() => {
    setUserListRejected(resGetAllUserRejected?.payload);

    // console.log('««««« userListRejected »»»»»', userListRejected);

    setCondition((prev) => ({
      ...prev,
      total: resGetAllUserRejected?.payload?.total || defaultPagination.total,
      page: resGetAllUserRejected?.payload?.page || defaultPagination.page,
      pageSize:
        resGetAllUserRejected?.payload?.pageSize ||
        defaultPagination.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [
    defaultPagination.page,
    defaultPagination.pageSize,
    defaultPagination.total,
    resGetAllUserRejected?.payload,
  ]);

  const onChangePage = useCallback((page, pageSize) => {
    setCondition((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  // manage list customer to filter base customer name
  const [customers, setCustomers] = useState([]);

  // manage list createdDates to filter base createdDates
  const [createdDates, setCreatedDates] = useState([]);

  // to filter customers from userList
  useEffect(() => {
    const filterCustomer = () => {
      const listCustomer = [];

      userListRejected?.payload?.forEach((item, index) => {
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
  }, [userListRejected.payload]);

  // to filter CreatedDate from userList
  useEffect(() => {
    const filterCreatedDate = () => {
      const listCreatedDate = [];

      userListRejected.payload?.forEach((item, index) => {
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
  }, [userListRejected.payload]);

  // rendering expandedRowRender content
  const expandedRowRender = useCallback((record) => {
    return (
      <div className="user_collapsed">
        {record?.userDetails?.map((item, index) => {
          return (
            <div
              key={index}
              className="row custom_row cover_item_user_collapsed"
            >
              <div className="col-8 custom_col cover_img_product_name_category">
                <div className="cover_img_user_collapsed">
                  <img
                    className="d-block w-100 img_user_collapsed"
                    src={require("assets/images/chuotda.webp")}
                    alt="..."
                  />
                </div>

                <div className="cover_product_name_category">
                  <span className="user_collapsed_product_name">
                    {item?.product?.name}
                  </span>

                  <span className="user_collapsed_category">
                    {item?.product?.category?.name}
                  </span>
                </div>
              </div>

              <div className="col-2 custom_col cover_user_collapsed_quantity">
                <span className="user_collapsed_quantity">
                  x{item?.quantity}
                </span>
              </div>

              <div className="col-2 custom_col cover_user_collapsed_price">
                <span className="user_collapsed_price">
                  {numeral(item?.price).format("0,0")} VNĐ
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
        className="btn_collapsed_user"
        onClick={(e) => onExpand(record, e)}
      >
        <CaretUpOutlined style={{ color: "rgb(99, 115, 129)" }} />
      </button>
    ) : (
      <button
        className="btn_collapsed_user"
        onClick={(e) => onExpand(record, e)}
      >
        <CaretDownOutlined style={{ color: "rgb(99, 115, 129)" }} />
      </button>
    );
  }, []);

  // declare columns of antd table
  const columns = [
    {
      title: "user",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      render: (text, record, index) => (
        <span className="link_id">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={`${LOCATIONS.PRODUCTS}/${record._id}`}
          >
            {text}
          </Link>
        </span>
      ),
    },
    {
      title: "Khách hàng",
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
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      filters: createdDates,
      onFilter: (value, record) => record.createdDate.indexOf(value) === 0,
      sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
      render: (text, record, index) => (
        <span className="user_createdDate">
          {record?.createdDate?.substring(0, 10)}
        </span>
      ),
    },
    {
      title: "Items",
      dataIndex: "userDetails",
      key: "userDetails",
      sorter: (a, b) => a.userDetails.length - b.userDetails.length,
      render: (text, record, index) => {
        if (record?.userDetails?.length > 0) {
          return (
            <span className="user_items">
              {record?.userDetails?.length || 0}
            </span>
          );
        }

        return <span className="user_items">0</span>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (text, record, index) => (
        <span className="user_totalPrice">
          {numeral(text).format("0,0")} VNĐ
        </span>
      ),
    },
    {
      title: "Trạng thái",
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

  return resGetAllUserRejected?.isLoading ? (
    <div className="cover_loading">
      <Loading />
    </div>
  ) : (
    <>
      <div className="cover_table_userlist">
        <Table
          rowKey="_id"
          columns={columns}
          expandable={{
            expandedRowRender,
            expandIcon,
          }}
          dataSource={userListRejected?.payload}
          pagination={false}
        />
      </div>

      <div className="cover_pagination_userlist">
        <Pagination
          defaultCurrent={1}
          total={condition?.total || defaultPagination.total}
          showTotal={(total, range) => `${range[0]} - ${range[1]} của ${total}`}
          pageSize={condition?.pageSize || defaultPagination.pageSize}
          pageSizeOptions={[
            1,
            5,
            10,
            condition?.total || defaultPagination.total,
          ]}
          showSizeChanger
          locale={{ items_per_page: "dòng / trang" }}
          responsive={true}
          onChange={onChangePage}
          current={condition?.page || defaultPagination.page}
        />
      </div>
    </>
  );
}

export default StatusRejected;
