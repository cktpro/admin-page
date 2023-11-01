import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "api/userApi";
import Loading from "components/loading";

const url = process.env.REACT_APP_BASE_URL_ADMIN;


const columns = [
  {
    title: "Name",
    render: (record) => {
      if (record.image)
        return (
          <Link to={`/user_detail/${record._id}`}>
            <div className="d-flex align-items-center img-user">
              <img
                src={`${url}${record.image.location.split("public", 2)[1]}`}
                alt={record.image.name}
                width="80px"
                height="80px"
                style={{ objectFit: "cover" }}
              />
              <div className="mx-2">
                <p className="m-0 fw-bold">{record.name}</p>
                <p className="m-0 text-black-50">{record.category.name}</p>
              </div>
            </div>
          </Link>
        );
      //<img src={`http://localhost:3005${record.image.location.split('public',2)[1]}`} alt="" width="100px" height="100px"/>
      return (
        <Link to={`/user_detail/${record._id}`}>
          <div className="d-flex align-items-center img-user">
            <img  
              src={require("assets/images/No-Image-Placeholder.png")}
              alt=""
              width="80px"
              height="80px"
              style={{ objectFit: "cover" }}
            />
            <div className="mx-2">
              <p className="m-0 fw-bold">{record.name}</p>
              <p className="m-0 text-black-50">{record.category.name}</p>
            </div>
          </div>
        </Link>
      );
    },
    filters: [
      {
        text: "Customers",
        value: "Customers",
      },
      {
        text: "Sellers",
        value: "Sellers",
      },
      {
        text: "Administrators",
        value: "Administrators",
      },
      // {
      //   text: "Registered Users)",
      //   value: "RegisteredUsers)",
      // },
      // {
      //   text: "Marketing and Advertising Group",
      //   value: "MarketingandAdvertisingGroup",
      // },
      // {
      //   text: "Customer support service)",
      //   value: "Customersupportservice)",
      // },


      //   {
      //     text: 'Category 1',
      //     value: 'Category 1',
      //     children: [
      //       {
      //         text: 'Yellow',
      //         value: 'Yellow',
      //       },
      //       {
      //         text: 'Pink',
      //         value: 'Pink',
      //       },
      //     ],
      //   },
      //   {
      //     text: 'Category 2',
      //     value: 'Category 2',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },  
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: "Phone Number",
    dataIndex: "phonenumber", // Assuming phone number is the property name in your data
    filters: [
      {
        text: "Starts with 1",
        value: "1",
      },
      {
        text: "Starts with 2",
        value: "2",
      },
      // Add more filter options as needed
    ],
    onFilter: (value, record) => record.phonenumber.toString().startsWith(value),
    filterSearch: true,
    render: (id, record) => (
      <Link to={`/details/${id}`}>{(record.phonenumber * (100 - record.phonenumber)) / 100}</Link>
    ),
  },
  {
    title: "Company",
    dataIndex: "Company", // Assuming "Company" is the property name in your data
    filters: [
      {
        text: "Starts with 1",
        value: "1",
      },
      {
        text: "Starts with 2",
        value: "2",
      },
      // Add more filter options as needed
    ],
    onFilter: (value, record) => record.Company.toString().startsWith(value),
    filterSearch: true,
    render: (id, record) => (
      <Link to={`/details/${id}`}>{(record.Company * (100 - record.Company)) / 100}</Link>
    ),
  },
  {
    title: "Role",
    dataIndex: "Role", // Assuming "Role" is the property name in your data
    filters: [
      {
        text: "Starts with 1",
        value: "1",
      },
      {
        text: "Starts with 2",
        value: "2",
      },
      // Add more filter options as needed
    ],
    onFilter: (value, record) => record.Role.toString().startsWith(value),
    filterSearch: true,
    render: (id, record) => (
      <Link to={`/details/${id}`}>{(record.Role * (100 - record.Role)) / 100}</Link>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status) => (
      <span
        className={`${
          status === "banned"
            ? "badge bg-danger"
            : status === "pending"
            ? "badge bg-warning"
            : status === "active"
            ? "badge bg-success"
            : ""
        }`}
      >
        {status}
      </span>
    ),
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="d-flex gap-1">
        <button className="btn btn-outline-primary">
          <img
            src={require("assets/images/pencil.png")}
            width="24px"
            height="24px"
            alt="edit"
          />
        </button>
        <button className="btn btn-outline-danger">
          <img
            src={require("assets/images/menuvertical.png")}
            width="24px"
            height="24px"
            alt="edit"
          />
        </button>
      </div>
    ),
  },
];

function UserList() {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getUser();
      setUser(res.data.payload);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div
        style={{ minWidth: "600px" }}
        className="d-flex justify-content-between my-1"
      >
        <h3>List User</h3>
        <div>
          <Link to="/add_user">
            <button type="button" className="btn btn-success">
              New User
            </button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={user}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
export default UserList;
