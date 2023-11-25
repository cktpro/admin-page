import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Space,
  Col,
  Row,
  message,
} from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
  DeleteFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { getCategory } from "api/categoryApi";
import { getSupplier } from "api/supplierApi";
import TextArea from "antd/es/input/TextArea";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
// import styles
import styles from "./createProduct.module.scss";
import { min } from "lodash";
const { Option } = Select;

function CreateProduct(props) {
  const [productForm] = Form.useForm();
  const [varianForm] = Form.useForm();
  const [categories, setCategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [step, setStep] = useState(0);
  //   const {
  //     isHiddenSubmit,
  //     formName,
  //     form,
  //     optionStyle,
  //     suppliers,
  //     categories,
  //     onFinish,
  //     className
  //   } = props;
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
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array); // eslint-disable-line
    }
  };
  const onFinish = useCallback(async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", values.upload.file);
      axiosAdmin.defaults.headers.common["Authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDAzMTMxODQsIl9pZCI6IjY1NDlkOTNmOWVmNTI1ZGU1MzU5MzE0NSIsImZpcnN0TmFtZSI6IkPDoXAiLCJsYXN0TmFtZSI6IktpbSBUcuG6p20iLCJwaG9uZU51bWJlciI6Ijg0MDM1NzA4MTE4NiIsImFkZHJlc3MiOiJRdeG6o25nIFRy4buLIiwiZW1haWwiOiJja3Rwcm9AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA3VDA2OjI5OjE5Ljc5M1oiLCJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTcwMDM5OTU4NH0.4SgKMHMTKyGUPTWlQCBGliKrA-Nm4TFTUm1MJ_L6DqU";
      const img = await axiosAdmin.post("/media/upload-single", formData);
      let list = [];
      await asyncForEach(
        values.images.fileList,
        async (arrayindex, index, array) => {
          // list.push(arrayindex.uid)
          // console.log('◀◀◀ list ▶▶▶',list);
          formData.append("file", arrayindex.originFileObj);
          const res = await axiosAdmin.post("/media/upload-single", formData);
          console.log("◀◀◀ res ▶▶▶", res);
          list.push({
            mediaId: res.data.payload.id,
            location: res.data.payload.location,
          });
          console.log("◀◀◀ list ▶▶▶", list);
        }
      );
      const productData = {
        name: values.name,
        price: values.price,
        discount: values.discount,
        stock: values.stock,
        width: values.width,
        height: values.height,
        weight: values.weight,
        length: values.length,
        description: values.description,
        categoryId: values.categoryId,
        supplierId: values.supplierId,
        coverImg: `${img.data.payload._id}`,
        imageList: list,
        // mediaId: "6550baa8446ae47a099208f0",
      };
      await axiosAdmin
        .post("/products", productData)
        .then((res) => {
          message.success("Thêm sản phẩm thành công")
          console.log("◀◀◀ res ▶▶▶", res);
        })
        .catch(async (err) => {
          message.error("Thêm sản phẩm thất bại")
          console.log('◀◀◀ Upload produts err ▶▶▶',err);
          await axiosAdmin.delete(`/media/${img.data.payload._id}`).then((res)=>{
            console.log('◀◀◀ Xóa cover image thành công ▶▶▶');
          }).catch((err)=>{
            console.log('◀◀◀ Xóa cover image thất bại ▶▶▶',err);
          })
          await asyncForEach(list, async (arrayindex, index, array) => {
            // list.push(arrayindex.uid)
            // console.log('◀◀◀ list ▶▶▶',list);
            
            const res = await axiosAdmin.delete(`/media/${arrayindex.mediaId}`);
            console.log("◀◀◀ res ▶▶▶", res);
          });
        });
    } catch (error) {
      message.error("Lỗi khi thêm sản phẩm")
      console.log("◀◀◀ error ▶▶▶", error);
    }

    // try {
    //   axiosAdmin.defaults.headers.common["Authorization"] =
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDAxMTYxNDYsIl9pZCI6IjY1NDlkOTNmOWVmNTI1ZGU1MzU5MzE0NSIsImZpcnN0TmFtZSI6IkPDoXAiLCJsYXN0TmFtZSI6IktpbSBUcuG6p20iLCJwaG9uZU51bWJlciI6Ijg0MDM1NzA4MTE4NiIsImFkZHJlc3MiOiJRdeG6o25nIFRy4buLIiwiZW1haWwiOiJja3Rwcm9AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA3VDA2OjI5OjE5Ljc5M1oiLCJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTcwMDIwMjU0Nn0.KJm6Qkf828ZT87fBR5sGXY4C330his1bf7wruEJEyps";
    //   await axiosAdmin
    //     .post("/media/upload-single", formData)
    //     .then(async (img) => {
    //       const productData = {
    //         name: values.name,

    //         discount: values.discount,

    //         description: values.description,
    //         categoryId: values.categoryId,
    //         supplierId: values.supplierId,
    //         mediaId: `${img.data.payload._id}`,
    //         // mediaId: "6550baa8446ae47a099208f0",
    //       };
    //       try {
    //         const product = await axiosAdmin.post(`/products`, productData);
    //         if (product) {
    //           message.success("Success to add product")
    //         }
    //         else {
    //           await axiosAdmin.delete(`/media/${img.data.payload.id}`);
    //         }
    //       } catch (error) {
    //         message.error("Fail to add product");
    //       }
    //     })
    //     .catch((err) => {
    //       message.error("Failed to addProduct");
    //     });

    //   // const product= await axiosAdmin.post(`/products`,productData)
    //   // const varianList = values.varians;
    //   // for (let i = 0; i < varianList.length; i++) {
    //   //   varianList[i].productId = productId;
    //   //   // const res = await axiosAdmin.post("/varians", varianList[i]);

    //   // }

    //   // console.log("◀◀◀ varianlist ▶▶▶", varianList);
    //   // const res= await axiosAdmin.delete(`/media/${img.data.payload.id}`)
    //   productForm.resetFields();
    //   setStep(1);
    // } catch (error) {
    //   console.log("◀◀◀ error ▶▶▶", error);
    // }
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <h4>Add Product</h4>
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
          layout="vertical"
          form={productForm}
          size="large"
          // className={className}
          // name={formName}

          onFinish={onFinish}
        >
          <h4 className="text-center my-3">Product Infomation</h4>
          <div className="row">
            <div className="col-xs-12 col-lg-6 col-sm-6">
              {" "}
              <Form.Item
                label="Supplier"
                name="supplierId"
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
                rules={[
                  { required: true, message: "Name is required" },
                  { max: 50, message: "Maximum 50 characters" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Price"
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

          <Form.Item
            label="Cover Image"
            name="upload"
            rules={[{ required: true, message: "Missing cover image" }]}
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
            rules={[{ required: true, message: "Missing cover image" }]}
          >
            <Upload name="list" beforeUpload={true} multiple listType="picture">
              <Button icon={<UploadOutlined />}>Image list</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Description" name="description">
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
          {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
          <Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
              <button
                type="button"
                onClick={() => productForm.resetFields()}
                className="btn btn-danger"
              >
                Reset
              </button>
            </div>
          </Form.Item>
        </Form>
        {/* <Form
          layout="vertical"
          form={varianForm}
          size="large"
          // className={className}
          // name={formName}
          name="formProduct"
          onFinish={onVarianFinish}
        >
          <h4 className="text-center my-3">Varian Infomation</h4>
          
          <Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-dark">
                Add Varian
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  varianForm.resetFields();
                }}
                className="btn btn-success"
              >
                Add Other Product
              </button>
            </div>
          </Form.Item>
        </Form> */}
      </div>
    </>
  );
}

export default memo(CreateProduct);
