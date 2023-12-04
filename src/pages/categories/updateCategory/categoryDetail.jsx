import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Table, Upload, message } from "antd";
import { memo } from "react";
import {
  getCategoryDetail,
  onAddCategory,
  updateCategory,
} from "api/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/loading";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./updateCategory.module.scss";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

function CategoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const categoryId = id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const[imageId,setImageId]=useState([])
  const [category, setCategory] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getCategoryDetail(categoryId);
        const data = response.data.payload;
        setImageId(data.imageId)
        setCategory(response.data.payload);
        setName(data.name);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        setLoading(false)
        console.error("err categoryId", error);
      }
    };
    fetchData();
  }, [categoryId]);

  const onFinish = useCallback(async (values) => {
    try {
      if(values?.upload?.file){
        const formData = new FormData();
      formData.append("file", values.upload.file);
     const res= await axiosAdmin.post("/media/upload-single",formData)

     values.imageId=res.data.payload.id
      }
      const result = await updateCategory(categoryId, values);
      navigate("/categories");
      console.log("cập nhật thành công:", result);
      if(values.imageId && values.imageId.toString()===imageId.toString()){
        const delImg= await axiosAdmin.delete(`/media/${imageId}`)
        console.log('◀◀◀ delImg ▶▶▶',delImg);
      }
      
    } catch (error) {
      console.error("Lỗi khi update danh mục", error);
    }
  }, [imageId]);

  // const values = {
  //   id
  // };

  // onFinish(values);
  if (loading === false) {
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>Update Category</h4>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Category Name"
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
              {/* <Input onChange={(e) => setName(e.target.value)}/> */}
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              initialValue={category.description}
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <Input />
              {/* <Input onChange={(e) => setDescription(e.target.value)}/> */}
            </Form.Item>
            <Form.Item
              label="Image"
              name="upload"
              // rules={[{ required: true, message: "Missing cover image" }]}
            >
              <Upload
                name="file"
                maxCount={1}
                beforeUpload={true}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Image</Button>
              </Upload>
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

export default memo(CategoryDetail);
