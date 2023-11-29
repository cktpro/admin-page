import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { LOCATIONS } from "constants";
import { useNavigate } from "react-router-dom";
import styles from "./createCategory.module.scss";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

function CreateCategory(props) {
  const [CreateCategory] = Form.useForm();
  const navigate = useNavigate();

  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array); // eslint-disable-line
    }
  };

  const onFinish = useCallback(async (values) => {
    try {
      const formData = new FormData();
      console.log("««««« values »»»»»", values);
      axiosAdmin.defaults.headers.common["Authorization"] =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDEwOTUzOTgsIl9pZCI6IjY1NDlkOTNmOWVmNTI1ZGU1MzU5MzE0NSIsImZpcnN0TmFtZSI6IkPDoXAiLCJsYXN0TmFtZSI6IktpbSBUcuG6p20iLCJwaG9uZU51bWJlciI6Ijg0MDM1NzA4MTE4NiIsImFkZHJlc3MiOiJRdeG6o25nIFRy4buLIiwiZW1haWwiOiJja3Rwcm9AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA3VDA2OjI5OjE5Ljc5M1oiLCJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTcwMTE4MTc5OH0.B7dEe82gyy2GM4dNaLsRNF9apjXPDuLkyAupVM4HpS4";
      formData.append("file", values.upload.file);
      const img = await axiosAdmin.post("/media/upload-single", formData);
      console.log("««««« img »»»»»", img);
      let list = [];
      console.log("««««« list »»»»»", list);
      await asyncForEach(
        values.upload.fileList,
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
      const categoryData = {
        name: values.name,
        description: values.description,
        imageId: `${img.data.payload._id}`,
      };
      await axiosAdmin
        .post("/categories", categoryData)
        .then((res) => {
          message.success("Thêm danh mục thành công");
          console.log("◀◀◀ res ▶▶▶", res);
        })
        .catch(async (err) => {
          message.error("Thêm danh mục thất bại");
          console.log("◀◀◀ Upload category err ▶▶▶", err);
          await axiosAdmin
            .delete(`/media/${img.data.payload._id}`)
            .then((res) => {
              console.log("◀◀◀ Xóa  image thành công ▶▶▶");
            })
            .catch((err) => {
              console.log("◀◀◀ Xóa  image thất bại ▶▶▶", err);
            });
        });
    } catch (error) {
      message.error("Lỗi khi thêm danh mục");
      console.log("◀◀◀ error ▶▶▶", error);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <h4>Add Category</h4>
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
          form={CreateCategory}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          size="large"
        >
          <h4 className="text-center my-3">Category Infomation</h4>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Name is required" },
              { max: 50, message: "Maximum 50 characters" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea style={{ minHeight: "200px" }} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="upload"
            rules={[{ required: true, message: "Missing cover image" }]}
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
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
              <button
                type="button"
                onClick={() => CreateCategory.resetFields()}
                className="btn btn-danger"
              >
                Reset
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default memo(CreateCategory);