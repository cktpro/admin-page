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
} from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getCategory } from "api/categoryApi";
import { getSupplier } from "api/supplierApi";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

function CreateProduct(props) {
  const [form] = Form.useForm();
  const [categories, setCategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
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
  const onFinish = useCallback((values) => {
    console.log("◀◀◀ values ▶▶▶", values);
  }, []);
  return (
    <div className="w-50 mx-auto">
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
      ></Form>
      <Form
        form={form}
        // className={className}
        // name={formName}

        onFinish={onFinish}
      >
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
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Cover Image" name="upload">
          <Upload name="file" beforeUpload={true} listType="picture">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

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

        <Form.Item label="Description" name="description">
          <TextArea style={{ minHeight: "200px" }} />
        </Form.Item>
        <Form.List name="varians" required>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Row >
                    <p>Product Varian {name + 1}</p>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Row>
                  
                  <Row>
                    <Col>
                      <Form.Item
                        {...restField}
                        label="Color"
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
                        label="Memory"
                        name={[name, "memory"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing memory",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Price"
                        name={[name, "price"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing price",
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Quantity"
                        name={[name, "quantity"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing memory",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        label="Width(cm)"
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
                        label="Height(cm)"
                        name={[name, "height"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing height",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Weight(g)"
                        name={[name, "weight"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing weight",
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Length(cm)"
                        name={[name, "length"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing length",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add product varians
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" onClick={() => form.resetFields()} danger>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(CreateProduct);
