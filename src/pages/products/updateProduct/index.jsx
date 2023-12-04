import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import React, { memo, useCallback, useEffect, useState } from "react";
import { getCategory } from "api/categoryApi";
import { getSupplier } from "api/supplierApi";
import { getProductDetail, onAddProduct, updateProduct } from "api/productApi";
import { LOCATIONS } from "constants";
import Loading from "components/loading";
import styles from "./updateProduct.module.scss";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { Link } from "react-router-dom";
function UpdateProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const { id } = useParams();
  const params = useParams();
  const productId = id;
  const [form] = Form.useForm();

  const [name, setName] = useState("");
  const [product, setProduct] = useState({});
  // const [description, setDescription] = useState("");
  const [categories, setCategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  // const [data, setData] = useState([]);
  // const [price, setPrice] = useState("");
  // const [discount, setDiscount] = useState("");
  // const [stock, setStock] = useState("");
  // const [width, setWidth] = useState("");
  // const [weight, setWeight] = useState("");
  // const [height, setHeight] = useState("");
  // const [length, setLength] = useState("");
  const [loading, setLoading] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« productIdsss »»»»»", productId);
        const response = await getProductDetail(productId);
        const data = response.data.payload;
        form.setFieldValue(data);
        setProduct(data);
        // setData(response.data.payload);
        // setName(data.name);
        // setDescription(data.description);
        // setPrice(data.price);
        // setDiscount(data.discount);
        // setStock(data.stock);
        // setHeight(data.height);
        // setWeight(data.weight);
        // setWidth(data.width);
        // setLength(data.length);
        setLoading(false);
      } catch (error) {
        console.error("err categoryId", error);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const category = await getCategory();
      setCategory(category.data.payload);
      const supplier = await getSupplier();
      setSupplier(supplier.data.payload);
      setIsLoading(false);
    };
    getData();
  }, []);

  const onFinish = useCallback(
    async (values) => {
      try {
        const result = await axiosAdmin.put(`/products/${product.id}`, values);
        navigate("/products");
        console.log("Update thành công:", result);
        message.success("Update product success");
      } catch (error) {
        message.error("Update product fail");
        console.error("cập nhật thất bại:", error);
      }
    },
    [product.id]
  );

  // const updateProduct = useCallback(
  //   async (id, updatedData) => {
  //     try {
  //       console.log('««««« id »»»»»', params.id);

  //       const response = await axiosAdmin.put(`/products/${params.id}`, updatedData);
  //       message.success(response.data.message);
  //       console.log('««««« response update »»»»»', response);
  //       return response;
  //     } catch (error) {
  //       message.error(error.response.data.message);
  //       console.log('««««« data.error »»»»»', error);
  //       return false;
  //     }
  //   });

  if (loading === false) {
    return (
      <>
        <div className="d-flex justify-content-between align-item-center">
          <h4>Update Product</h4>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>

        <div className={styles.main_form}>
          <Form
            form={form}
            onFinish={onFinish}
            // onFinish={updateProduct}
            size="large"
            layout="vertical"
          >
            <h4 className="text-center my-3">Product Infomation</h4>
            <div className="row">
              <div className="col-xs-12 col-lg-6 col-sm-6">
                <Form.Item
                  label="Supplier"
                  name="supplierId"
                  initialValue={product.supplierId}
                  rules={[
                    {
                      required: true,
                      message: "Please choose supplier",
                    },
                  ]}
                >
                  <Select>
                    {isLoading === false ? (
                      suppliers.map((s) => (
                        <Option key={s.id || s._id} value={s.id || s._id}>
                          {s.name}
                        </Option>
                      ))
                    ) : (
                      <Option>Loading..</Option>
                    )}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-xs-12 col-lg-6 col-sm-6">
                <Form.Item
                  label="Category"
                  name="categoryId"
                  initialValue={product.categoryId}
                  rules={[
                    {
                      required: true,
                      message: "Please choose category",
                    },
                  ]}
                >
                  <Select>
                    {isLoading === false ? (
                      categories.map((s) => (
                        <Option key={s.id || s._id} value={s.id || s._id}>
                          {s.name}
                        </Option>
                      ))
                    ) : (
                      <Option>Loading..</Option>
                    )}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className=" col-xs-12 col-lg-6 col-sm-6">
                <Form.Item
                  label="Product Name"
                  name="name"
                  initialValue={product.name}
                  rules={[
                    { required: true, message: "Name is required" },
                    { max: 150, message: "Maximum 150 characters" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              {/* <Form.Item label="Hình ảnh" name="upload">
            <Upload name="file" beforeUpload={true} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}
              <div className=" col-xs-12 col-lg-6 col-sm-6">
                <Form.Item
                  label="Price"
                  initialValue={product.price}
                  name="price"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      message: "Please enter a price from 0 ",
                    },
                    { required: true, message: "Discount is required" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className=" col-xs-12 col-lg-6 col-sm-6">
                <Form.Item
                  label="Stock"
                  name="stock"
                  initialValue={product.stock}
                  rules={[
                    { required: true, message: "Name is required" },
                    {
                      type: "number",
                      min: 1,
                      message: "Please enter a stock from 1",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <div className=" col-xs-12 col-lg-6 col-sm-6">
                <Form.Item
                  label="Discount (%)"
                  name="discount"
                  initialValue={product.discount}
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 75,
                      message: "Please enter a discount from 0 to 75",
                    },
                    { required: true, message: "Discount is required" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className=" col-xs-12 col-lg-6 col-sm-6">
                <Link to={`/update_image/${product.id}`}><Button>Update Image</Button></Link>
              </div>

              {/* <Form.Item label="Hình ảnh" name="upload">
            <Upload name="file" beforeUpload={true} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}
            </div>

            {/* <Form.Item
            label="Cover Image"
            name="upload"
          >
            <Upload
              name="file"
              maxCount={1}
              beforeUpload={true}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Cover image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Image List"
            name="images"
          >
            <Upload name="list" beforeUpload={true} multiple listType="picture">
              <Button icon={<UploadOutlined />}>Image list</Button>
            </Upload>
          </Form.Item> */}

            <Form.Item
              label="Description"
              name="description"
              initialValue={product.description}
            >
              <TextArea style={{ minHeight: "200px" }} />
            </Form.Item>

            {/* Product Spec */}
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-start">
                <span>Product Spec</span>
              </div>

              <div className="row">
                <div className="col-xs-12 col-lg-6 col-sm-6">
                  <Form.Item
                    label="Width"
                    name="width"
                    initialValue={product.width}
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        message: "Please enter a width from 0 ",
                      },
                      { required: true, message: "Width is required" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Width(cm)"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Height"
                    name="height"
                    initialValue={product.height}
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        message: "Height is invalid",
                      },
                      {
                        required: true,
                        message: "Missing height",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Height(cm)"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="col-xs-12 col-lg-6 col-sm-6">
                  <Form.Item
                    label="Weight"
                    name="weight"
                    initialValue={product.weight}
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        message: "Weight is invalid",
                      },
                      {
                        required: true,
                        message: "Missing weight",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Weight(gram)"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Length"
                    name="length"
                    initialValue={product.length}
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        message: "Length is invalid",
                      },
                      {
                        required: true,
                        message: "Missing length",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Length(cm)"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="row"></div>
              </div>
            </div>

            <Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-dark"
                >
                  Submit
                </Button>
                <Button
                  type="primary"
                  onClick={() => form.resetFields()}
                  danger
                  className="btn btn-danger"
                >
                  Hủy
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
  return <Loading />;
}

export default memo(UpdateProduct);
