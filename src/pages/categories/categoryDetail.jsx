import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, Input, Table } from 'antd';
import { memo } from 'react';
import { getCategoryDetail, onAddCategory, updateCategory } from 'api/categoryApi';
import { useParams } from 'react-router-dom';
import Loading from 'components/loading';

function CategoryDetail() {
  const  {id}  = useParams();
  const categoryId = id
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category,setCategory]=useState([])
  const [form] = Form.useForm();
  const [loading,setLoading]=useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('««««« categoryIdsss »»»»»', categoryId);
        const response = await getCategoryDetail(categoryId);
        const data = response.data.payload;
        console.log('««««« data »»»»»', data);
        setCategory(response.data.payload)
        setName(data.name)
        setDescription(data.description);
        setLoading(false)
      } catch (error) {
        console.error('err categoryId', error);
      }
    };
    fetchData();
  }, [categoryId]);
  
  const onFinish = useCallback(async (values) => { 
    console.log('««««« values data »»»»»', values )
    try {
      const result = await updateCategory(categoryId, values);
     
      console.log("cập nhật thành công:", result);
    } catch (error) {
      console.error("Lỗi khi update danh mục", error);
    }
  }, []);

  // const values = {  
  //   id
  // };
  
  // onFinish(values);

  if (loading===false){
  return (
    <div>
      <Form
        onFinish={onFinish}
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
          // initialValue={name} 
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh mục',
            },
          ]}
        >
          <Input defaultValue={name} />
          {/* <Input onChange={(e) => setName(e.target.value)}/> */}
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          // initialValue={category.description}
         
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả',
            },
          ]}
        >
          <Input defaultValue={description} />
          {/* <Input onChange={(e) => setDescription(e.target.value)}/> */}
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
    </div>
  );
}
return <Loading/>
  
}

export default memo(CategoryDetail);