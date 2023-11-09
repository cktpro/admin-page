import React, { memo, useCallback, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { onAddCategory } from "api/categoryApi"; // Thay thế 'your-module-path' bằng đường dẫn tới module chứa hàm onAddCategory


function CreateCategory(props) {
  const [CreateCategory] = Form.useForm();

  const onFinish = useCallback(async (values) => {
    try {
      const result = await onAddCategory(values); // Gọi hàm onAddCategory để thêm danh mục
      console.log("Danh mục đã được thêm:", result);
      // Xử lý thành công (nếu cần)
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      // Xử lý lỗi (nếu có)
    }
  }, []);

  return (
    <div className="w-50 mx-auto">
      <Form
        form={CreateCategory}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea style={{ minHeight: "200px" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="primary"
            onClick={() => CreateCategory.resetFields()}
            danger
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(CreateCategory);