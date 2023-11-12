import React, { useEffect, useState } from "react";
import { Popconfirm, Table } from "antd";
import { Link } from "react-router-dom";
import { deleteProduct, getProduct, getProductDetail, handleSearch } from "api/productApi";
import Loading from "components/loading";
import { getCategory } from "api/categoryApi";

const url = process.env.REACT_APP_BASE_URL_ADMIN;

function ProductList(props) {
    const [isLoading, setIsLoading] = useState(null);
    const [product, setProduct] = useState([]);
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const handleRowClick = (record) => {
      const id = record._id;
      console.log("productId", id);
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
        // Fetch category list
        const fetchCategoryList = async () => {
          try {
            const response = await getCategory();
            setCategoryList(response.data.payload); // Lưu danh sách danh mục từ API
            console.log('««««« categoryList »»»»»', categoryList);
          } catch (error) {
            console.error("Failed to fetch category list:", error);
          }
        };
    
        // Fetch product list
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await getProduct();
            setProduct(response.data.payload);
          } catch (error) {
            console.error("Failed to fetch product list:", error);
          }
          setIsLoading(false);
        };
          // Call both functions
    fetchCategoryList();
    fetchData();
  }, []);
  const categoryFilters = Array.isArray(categoryList) ? categoryList.map((category) => ({
    text: category.name,
    value: category.name,
  })) : [];
    const columns = [
        {
          title: "Tên sản phẩm",
          render: (record) => {
            if (record.image)
              return (
                <Link to={`/product_detail/${record._id}`}>
                  <div className="d-flex align-items-center img-products">
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
              <Link to={`/product_detail/${record._id}`}>
                <div className="d-flex align-items-center img-products">
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
        
      
        //   filters: [
        //     {
        //       text: "Iphone",
        //       value: "Iphone",
        //     },
        //     {
        //       text: "Samsung",
        //       value: "Samsung",
        //     },
        //     //   {
        //     //     text: 'Category 1',
        //     //     value: 'Category 1',
        //     //     children: [
        //     //       {
        //     //         text: 'Yellow',
        //     //         value: 'Yellow',
        //     //       },
        //     //       {
        //     //         text: 'Pink',
        //     //         value: 'Pink',
        //     //       },
        //     //     ],
        //     //   },
        //     //   {
        //     //     text: 'Category 2',
        //     //     value: 'Category 2',
        //     //     children: [
        //     //       {
        //     //         text: 'Green',
        //     //         value: 'Green',
        //     //       },
        //     //       {
        //     //         text: 'Black',
        //     //         value: 'Black',
        //     //       },
        //     //     ],
        //     //   },
        //   ],
          
        filters: categoryFilters,
        filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.category.name.includes(value),
        },
        {
          title: "Giá gốc",
          dataIndex: "price",
          sorter: (a, b) => a.price - b.price,
        },
      
        {
          title: "Giảm giá",
          dataIndex: "discount",
          // filters: [
          //   {
          //     text: "stock",
          //     value: "stock",
          //   },
          //   {
          //     text: "stock",
          //     value: "stock",
          //   },
          // ],
          // onFilter: (value, record) => record.address.startsWith(value),
          // filterSearch: true,
          sorter: (a, b) => a.discount - b.discount,
        },
        {
          title: "Giá sale",
      
          // filters: [
          //   {
          //     text: "stock",
          //     value: "stock",
          //   },
          //   {
          //     text: "stock",
          //     value: "stock",
          //   },
          // ],
          // onFilter: (value, record) => record.address.startsWith(value),
          // filterSearch: true,
          render: (id, record) => (
            <Link>{(record.price * (100 - record.discount)) / 100}</Link>
          ),
        },
      
        {
          title: "Số lượng còn",
          render: (record) => (
            <span
              className={`${
                record.stock > 100
                  ? "badge bg-success"
                  : `${record.stock > 50 ? "badge  bg-warning" : "badge bg-danger"}`
              }`}
            >
              {record.stock}
            </span>
          ),
          sorter: (a, b) => a.stock - b.stock,
        },
        {
          title: "Ngày tạo",
          render: (record) => {
            return <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>;
          },
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div className="d-flex gap-1">
              <Link to={`/update_product/${record._id}`}>
              <button className="btn btn-outline-primary"
              onConfirm={() => getProductDetail(record._id)}>
                <img
                  src={require("assets/images/edit-report-svgrepo-com.png")}
                  width="24px"
                  height="24px"
                  alt="edit"
                />
              </button></Link>

              <Popconfirm
          title="Bạn có muốn xóa không?"
          okText="Đồng ý"
          cancelText="Hủy"
          onConfirm={() => deleteProduct(record._id)}
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
    return (
      <>
        <div
          style={{ minWidth: "600px" }}
          className="d-flex justify-content-between my-1"
        >
          <h3>Danh sách sản phẩm</h3>
          <div>
            <Link to="/add_product">
              <button type="button" className="btn btn-success">
                Thêm sản phẩm
              </button>
            </Link>
          </div>
        </div>
        {!isLoading ? (
          <Table
            rowKey="_id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={product}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        ) : (
          <Loading />
        )}
      </>
    );
  }
  export default ProductList;