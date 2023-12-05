import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Table, Upload, message } from "antd";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/loading";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./updateSupplier.module.scss";
import { getSupplierDetail, updateSupplier } from "api/supplierApi";

function UpdateSupplier() {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const supplierId = id;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« categoryIdsss »»»»»", supplierId);
        const response = await getSupplierDetail(supplierId);
        const data = response.data.payload;
        console.log("««««« data »»»»»", data);
        setSupplier(response.data.payload);
        setName(data.name);
        setAddress(data.address);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setLoading(false);
      } catch (error) {
        console.error("err supplierId", error);
      }
    };
    fetchData();
  }, [supplierId]);

    const onFinish = useCallback(async (values) => {
      console.log("««««« values data »»»»»", values);
      try {
        const result = await updateSupplier(supplierId, values);
        console.log("cập nhật thành công:", result);
        navigate("/suppliers");
      } catch (error) {
        console.error("Lỗi khi update danh mục", error);
      }
    }, []);

  if (loading === false) {
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>Update Supplier</h4>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
        <div className="{styles.main_form}">
          <Form
            form={form}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
              onFinish={onFinish}
          >
            <Form.Item
              label="Supplier Name"
              name="name"
              initialValue={name}
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
                { max: 50, message: "Maximum 50 characters" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              initialValue={email}
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="PhoneNumber"
              name="phoneNumber"
              initialValue={phoneNumber}
              rules={[{ required: true, message: "PhoneNumber is required" },
            { type: "phone", message:  "Invalid phoneNumber format"},
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              initialValue={address}
              rules={[
                { required: true, message: "Address is required" },
                { type: "address", message: "Invalid address format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
              <div className="d-flex justify-content-between align-items-center">
                <Button type="primary" htmlType="update">
                  Update
                </Button>
                <Button
                  type="primary"
                  onClick={() => form.resetFields()}
                  danger
                >
                  Hủy
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  return <Loading />;
}

export default memo(UpdateSupplier);
