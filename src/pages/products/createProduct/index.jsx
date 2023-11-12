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
  const checkDulicate=(list)=>{
    let duplicate=0
    for (let i = 0; i < list.length-1; i++) {
      const dup =list.filter((item)=>(item.color===list[i].color && item.memory ===list[i].memory))
      console.log('◀◀◀ dup ▶▶▶',dup);
      
      
    }
    return duplicate
  }
  const onVarianFinish = useCallback(async (values) => {
     try {
      const dup=  checkDulicate(values.varians)
      console.log('◀◀◀ dup ▶▶▶',dup);
      // for (let index = 0; index < values.varians.length; index++) {
      //   console.log('◀◀◀ productId ▶▶▶',productId);
      //   values.varians[index].productId=productId
      //   const res= await axiosAdmin.post(`/varians`, values.varians[index]);
      //   message.success("Success to add varians")
      // }
     } catch (error) {

      console.log('◀◀◀ error ▶▶▶',error);
      message.error("Failed to add varians")
     }
  }, []);
  const onFinish = useCallback(async (values) => {
    const dup=  checkDulicate(values.varians)
      console.log('◀◀◀ dup ▶▶▶',dup);
    const formData = new FormData();
    formData.append("file", values.upload.file);

    // try {
    //   axiosAdmin.defaults.headers.common["Authorization"] =
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk3ODcyOTYsIl9pZCI6IjY1NGIwYzgxMDliMDViOTE2ZTQwMTIyNCIsImZpcnN0TmFtZSI6Ik5ndXnhu4VuIiwibGFzdE5hbWUiOiJBbiIsImVtYWlsIjoiYW5uZ3V5ZW5AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA4VDA0OjIwOjE3LjU1MloiLCJyb2xlIjoiVVNFUiIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwIjoxNjk5ODczNjk2fQ.XfuYKf9fbfXCFeiMp64JGXqTIXAYVcBKdhpGZs9rJk4";
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
            <Upload name="file" beforeUpload={true} listType="picture">
              <Button icon={<UploadOutlined />}>Cover image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea style={{ minHeight: "200px" }} />
          </Form.Item>
          <Form.List name="varians" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center justify-content-start gap-2">
                      <span>Product Varian {name + 1}</span>
                      {name > 0 ? (
                        <button type="button" className="btn btn-sm">
                          <DeleteFilled
                            style={{ color: "red" }}
                            onClick={() => remove(name)}
                          />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="row">
                      <div className="col-xs-12 col-lg-6 col-sm-6">
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing color",
                            },
                          ]}
                        >
                          <Input placeholder="Color" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "memory"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing memory",
                            },
                          ]}
                        >
                          <Input placeholder="Memory" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing price",
                            },
                          ]}
                        >
                          <Input type="number" placeholder="Price" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "stock"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing memory",
                            },
                          ]}
                        >
                          <Input placeholder="Stock" />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-lg-6 col-sm-6">
                        <Form.Item
                          {...restField}
                          name={[name, "width"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing width",
                            },
                          ]}
                        >
                          <Input placeholder="Width" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "height"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing height",
                            },
                          ]}
                        >
                          <Input placeholder="Height(cm)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "weight"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing weight",
                            },
                          ]}
                        >
                          <Input type="number" placeholder="Weight(g)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "length"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing length",
                            },
                          ]}
                        >
                          <Input placeholder="Length(cm)" />
                        </Form.Item>
                      </div>
                      <div className="row">
                        <Form.Item
                          {...restField}
                          name={[name, "image"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing image",
                            },
                          ]}
                        >
                          <Upload
                            name="file"
                            beforeUpload={true}
                            listType="picture"
                          >
                            <Button icon={<UploadOutlined />}>
                              Upload image
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add more varians
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
                Hủy
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
