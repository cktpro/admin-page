import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getCategory } from "api/categoryApi";
import { getSupplier } from "api/supplierApi";
import TextArea from "antd/es/input/TextArea";
import { onAddProduct } from "api/productApi";
import { LOCATIONS } from "constants";
const { Option } = Select;

function CreateProduct(props) {
    const [form] = Form.useForm();
  const [categories, setCategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  
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
  
  const onFinish = useCallback(async (values) => {
    try {
      const result = await onAddProduct(values); 
      console.log("sản phẩm đã được thêm:", result);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  }, []);

  return (
    <div className="w-50 mx-auto">
      <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      >
            <Form.Item
              label="Nhà cung cấp"
              name="supplierId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà cung cấp",
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
              label="Loại sản phẩm"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại sản phẩm",
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
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Hình ảnh" name="upload">
          <Upload name="file" beforeUpload={true} listType="picture">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          name="price"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập giá gốc từ 0",
            },
            { required: true, message: "Vui lòng nhập giá gốc" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Chiết khấu (%)"
          name="discount"
          rules={[
            {
              type: "number",
              min: 0,
              max: 75,
              message: "Vui lòng nhập giảm giá từ 0 đến 75",
            },
            { required: true, message: "Vui lòng nhập giảm giá" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Tồn kho"
          name="stock"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập tồn kho lớn hơn 0",
            },
            { required: true, message: "Vui lòng nhập tồn kho" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea style={{minHeight:"200px"}} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
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
