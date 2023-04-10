import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Checkbox, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
import { upload } from '../../api/upload';

interface IProps {
    onAdd: Function
}

const AddProductPage: React.FC<IProps> = ({ onAdd}) => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        onAdd(values);
        navigate("/admin/products")
        window.location.reload()
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange =  async (info: any) => {

        
        const response  = await upload(info)
        console.log(response);
        
    }
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        { required: true, 
                            message: 'Please input your product name!' },
                            {
                                pattern: /^[A-Za-z ]+$/,
                                message: 'Name must only contain letters and spaces',
                              }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[
                        { required: true,
                             message: 'Please input your price!' },
                             {
                                pattern: /[0-9]+/,
                                message: 'Phone number must be 10 digits',
                              },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="" listType="picture-card" onChange={handleChange}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProductPage

