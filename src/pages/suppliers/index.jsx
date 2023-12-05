import { Popconfirm, Table } from "antd";
import { deleteSupplier, getSupplier, getSupplierDetail } from "api/supplierApi";
import Loading from "components/loading";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_BASE_URL_ADMIN;

const columns = [
  {
    title: "Suppliers name",
    render: (record) => {
        return (
          <div className="mx-2">
            <p className="m-0 fw-bold">{record.name}</p>
          </div>
        );
    },
  },

  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },

  {
    title: "Phone Number",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  
  {
    title: "Address",
    key: "address",
    dataIndex: "address",
  },
  // {
  //   title: "Mô tả",
  //   key: "description",
  //   dataIndex: "description",
  // },

  {
    title: "Date created",
    render: (record) => {
      return <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="d-flex gap-1">
        <Link to={`/suppliers/${record._id}`}>
          <button
            className="btn btn-outline-primary"
            onConfirm={() => getSupplierDetail(record._id)}
          >
            <img
              src={require("assets/images/edit-report-svgrepo-com.png")}
              width="24px"
              height="24px"
              alt="edit"
            />
          </button>
        </Link>

        <Popconfirm
          title="Bạn có muốn xóa không?"
          okText="Đồng ý"
          cancelText="Hủy"
          okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
          onConfirm={() => deleteSupplier(record._id)}
        >
          <button className="btn btn-outline-danger">
            <img
              src={require("assets/images/delete-trash-svgrepo-com.png")}
              width="24px"
              height="24px"
              alt="edit"
            />
          </button>
        </Popconfirm>
      </div>
    ),
  },
];
function SupplierList() {
  

  const [isLoading, setIsLoading] = useState(null);
  const [supplier, setSupplier] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const handleRowClick = (record) => {
    const supplierId = record._id;
    console.log("supplierId", supplierId);
  };

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
      const res = await getSupplier();
      setSupplier(res.data.payload);
      setIsLoading(false); 
    };
    fetchData();
  }, []);
  
  return (
  <>
      <div style={{ minWidth: "600px" }} className="d-flex justify-content-between my-1">
        <h3>List of suppliers</h3>
        <div>
          <Link to="/add_supplier">
            <button type="button" className="btn btn-success">Add new supplier</button>
          </Link>
        </div>
      </div>

      {!isLoading ? (
        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={supplier}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      ) : (
        <Loading />
      )}
  </>
    )
}

export default SupplierList;
