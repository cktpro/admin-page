import React, { useCallback, useEffect, useState } from "react";
import { Input, Popconfirm, Table, message } from "antd";
import { Link, useHistory, useNavigate} from "react-router-dom";
import {
  // deleteProduct,
  getProduct,
  getProductDetail,
  handleSearch,
} from "api/productApi";
import Loading from "components/loading";
import { getCategory } from "api/categoryApi";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

const url = process.env.REACT_APP_BASE_URL_ADMIN;

function SearchProduct(props) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) =>{
    setKeyword(e.target.value);
  }
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
        console.log("««««« categoryList »»»»»", categoryList);
      } catch (error) {
        console.error("Failed to fetch category list:", error);
      }
    };

    const getData = async () => {
      // setIsLoading(true);
      if (keyword === "") {
        // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sản phẩm
        try {
          const response = await getProduct();
          console.log('««««« resabd »»»»»', response);
          setProduct(response.data.payload);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch product list:", error);
          setIsLoading(false);
        }
      } else {
        // Nếu có từ khóa tìm kiếm, thực hiện tìm kiếm và hiển thị kết quả 
        try {
          const response = await handleSearch(keyword);
          console.log('««««« res search nef »»»»»', response);
          if (response?.payload) {
            setProduct(response.payload);
            setIsLoading(false);
          } else {
            setProduct([]);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Failed to fetch search results:", error);
          setIsLoading(false);
        }
      }
    };
    // Call both functions
    fetchCategoryList();
    getData();

  }, []);


  const categoryFilters = Array.isArray(categoryList)
    ? categoryList.map((category) => ({
        text: category.name,
        value: category.name,
      }))
    : [];

    const deleteProduct = useCallback(
      (id) => async () => {
      try {
        axiosAdmin.defaults.headers.common["Authorization"] =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA4MzY2MzcsIl9pZCI6IjY1NDlkOTNmOWVmNTI1ZGU1MzU5MzE0NSIsImZpcnN0TmFtZSI6IkPDoXAiLCJsYXN0TmFtZSI6IktpbSBUcuG6p20iLCJwaG9uZU51bWJlciI6Ijg0MDM1NzA4MTE4NiIsImFkZHJlc3MiOiJRdeG6o25nIFRy4buLIiwiZW1haWwiOiJja3Rwcm9AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA3VDA2OjI5OjE5Ljc5M1oiLCJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTcwMDkyMzAzN30.KSMlD55Q6xZ_rYeVlSxefJj4z9oaJcp1xadqZI8Y9nY";
        // Xóa sản phẩm
        const imgResponse = await axiosAdmin.get(`/products/${id}`);
        console.log('««««« imgResponse »»»»»', imgResponse);
        const imgId = imgResponse.data.payload.image.id; 
        const deleteImgResponse = await axiosAdmin.delete(`/media/${imgId}`);
        console.log('◀◀◀ Xóa ảnh thành công ▶▶▶');

        const imgListId = imgResponse.data.payload.imageList; 
        for (const mediaId of imgListId) {
          const id = mediaId.mediaId;
          console.log(mediaId);
          const deleteImgListResponse = await axiosAdmin.delete(`/media/${id}`);
        console.log('◀◀◀ Xóa list ảnh thành công ▶▶▶');
        }
        
        const response = await axiosAdmin.patch(`/products/delete/${id}`);
        console.log('◀◀◀ Xóa sản phẩm thành công ▶▶▶');
    
        message.success(response.data.message);
        window.location.reload();
    
        return response.data;
      } catch (error) {
        message.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm");
        throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm");
      }
    });
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
        // <img src={`http://localhost:3005${record.image.location.split('public',2)[1]}`} alt="" width="100px" height="100px"/>
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
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Giá sale",
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
        return (
          <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link to={`/update_product/${record._id}`}>
            <button
              className="btn btn-outline-primary"
              onConfirm={() => getProductDetail(record._id)}
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
            onConfirm={deleteProduct(record._id)}
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

        <div style={{ marginLeft: "500px" }}>
          <Input.Search
            value={keyword}
            onChange={handleInputChange}
            onSearch={handleSearch}
            className="search-input"
            type="text"
            placeholder="Type anything for me..."
            enterButton
          />
        </div>

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
export default SearchProduct;
