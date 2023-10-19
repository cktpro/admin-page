import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "api/productApi";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import Loading from "components/loading";
// Import style
import "./productDetail.scss";
const url = process.env.REACT_APP_BASE_URL_ADMIN;
function ProductDetail(props) {
  const [isLoading, setIsLoading] = useState(null);
  const [product, setProduct] = useState([]);
  const params = useParams();
  const handleProductStock = useCallback((stock) => {
    if (stock >= 100) return <p className="text-success fw-bold">Còn hàng</p>;
    if (stock < 100 && stock > 0)
      return <p className="text-warning fw-bold">Sắp hết hàng</p>;
    return <p className="text-danger fw-bold">Hết hàng</p>;
  }, []);
  const handleStatusProduct= useCallback((date)=>{
    if(new Date(product.createdAt).getMonth() ===
    new Date().getMonth()) return <p className="badge bg-info p-2">New</p>
    return <p className="badge bg-secondary p-2">On Sale</p>
},[product.createdAt])
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await getProductDetail(params.id);
      if (res?.data?.payload) {
        setProduct(res.data.payload);
        setIsLoading(false);
      } else setIsLoading(0);
    };
    getData();
  }, []);
  if (isLoading === true) {
    return <Loading />;
  }
  if (isLoading === false) {
    return (
      <div className="container">
        {/* Detail section*/}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            Back
          </button>
          <Link to={`/update_product/${product._id}`}>
            <button type="button" className="btn btn-primary">
              Edit
            </button>
          </Link>
        </div>
        <div className="d-flex border gap-2 my-2">
          <img
            className="img-product-detail"
            src={
              product?.image
                ? `${url}${product.image.location.split("public", 2)[1]}`
                : require("assets/images/No-Image-Placeholder.png")
            }
            alt={product?.image?`${product.image.name}`:"No image"}
          />

          <div className="m-3">
            {handleStatusProduct(product.createdAt)}
            {handleProductStock(product.stock)}
            {/* {product.stock > 0 ? (
              <p className="text-success fw-bold">Còn hàng</p>
            ) : (
              <p className="text-danger fw-bold">Hết hàng</p>
            )} */}
            <h5>{product.name}</h5>
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex align-items-center gap-1 my-1">
                <Rate allowHalf disabled value={4.5} />
                <span>(330 review)</span>
              </div>
            </div>
            <h2 >${product.price}</h2>
            <p>{product.description}</p>
          </div>
        </div>
        {/* Descripton section */}
        <div className="border">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className="nav-link active">Description</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Review</button>
            </li>
            {/* <li className="nav-item">
    <a clasNames="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li> */}
          </ul>
        </div>
      </div>
    );
  }

  return <div className="alert alert-warning py-2">Không có sản phẩm</div>;
}

export default ProductDetail;
