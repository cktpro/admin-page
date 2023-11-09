import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table } from 'antd';
import { memo } from 'react';
import { getCategoryDetail } from 'api/categoryApi';
import { useParams } from 'react-router-dom';

function CategoryDetail() {
  const  {id}  = useParams();
  const categoryId = id
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('««««« categoryIdsss »»»»»', categoryId);
        const response = await getCategoryDetail(categoryId);
        const data = response.data.payload;
        console.log('««««« data »»»»»', data);
        setName(data.name)
        setDescription(data.description);
      } catch (error) {
        console.error('err categoryId', error);
      }
    };
    fetchData();
  }, [categoryId]);
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <Form
        name="wrap"
        labelCol={{
          flex: '110px',
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          initialValue={name} 
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh mục',
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          initialValue={description} 
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả',
            },
          ]}
        >
          <Input  onChange={(e) => setDescription(e.target.value)}/>
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="update">
            Cập nhật
          </Button>
          <Button type="primary" onClick={() => form.resetFields()} danger>
            Hủy
          </Button>
        </Form.Item>
      </Form>
     <p>{name}</p>
     <p>{description}</p>
    </div>
  );
}

export default memo(CategoryDetail);