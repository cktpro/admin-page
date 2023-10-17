import React, { memo, useCallback, useEffect, useState } from "react";
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
  const onFinish=useCallback((values)=>{
    console.log('◀◀◀ values ▶▶▶',values);
  },[])
  return (
    <div className="w-50 mx-auto">
      <Form
      form={form}
      // className={className}
      // name={formName}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      // style={optionStyle}
      onFinish={onFinish}
      >
        {/* <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính",
            },
          ]}
        >
          <Select
            options={[
              {
                value: "male",
                label: "Nam",
              },
              {
                value: "female",
                label: "Nữ",
              },
              {
                value: "other",
                label: "Khác",
              },
            ]}
          >
            {/* <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option> */}
        {/* </Select>
        </Form.Item> */}

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
