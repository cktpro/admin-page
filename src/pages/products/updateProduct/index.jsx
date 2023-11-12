import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import TextArea from 'antd/es/input/TextArea';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { getCategory } from "api/categoryApi";
import { getSupplier } from "api/supplierApi";
import { getProductDetail, onAddProduct } from "api/productApi";
import { LOCATIONS } from "constants";
import Loading from 'components/loading';
function UpdateProduct(props) {
    const  {id}  = useParams();
    const productId = id
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategory] = useState([]);
    const [suppliers, setSupplier] = useState([]);
    const [data, setData] = useState([]);
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [stock, setStock] = useState('');
    const [loading,setLoading]=useState(null)
    const [isLoading, setIsLoading] = useState(null);
    const { Option } = Select;
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('««««« productIdsss »»»»»', productId);
            const response = await getProductDetail(productId);
            const data = response.data.payload;
            console.log('««««« data »»»»»', data);
            setData(response.data.payload)
            setName(data.name)
            setDescription(data.description);
            setPrice(data.price);
            setDiscount(data.discount);
            setStock(data.stock);
            setLoading(false)
          } catch (error) {
            console.error('err categoryId', error);
          }
        };
        fetchData();
      }, [productId]);

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
  
    if (loading===false){
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
                initialValue={data.supplier.name}
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
                initialValue={data.category.name}
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
            initialValue={name} 
            rules={[
              { required: true, message: "Vui lòng nhập tên sản phẩm" },
              { max: 150, message: "Tối đa 150 ký tự" },
            ]}
          >
            <Input onChange={(e) => setName(e.target.value)}/>     
          </Form.Item>

          <Form.Item label="Hình ảnh" name="upload">
            <Upload name="file" beforeUpload={true} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Giá gốc"
            initialValue={price}
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
            initialValue={discount}
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
            initialValue={stock}
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
  
          <Form.Item label="Mô tả" name="description"
          initialValue={description}>
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
        <p>{name}</p>
        <p>{data.category.name}</p>
        <p>{stock}</p>
      </div>
    );
  }
  return <Loading/>
  
}

export default memo(UpdateProduct);