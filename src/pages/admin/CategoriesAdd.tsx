import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Checkbox, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
import { upload } from '../../api/upload';

interface IProps {
    onAddCategory: Function
}

const AddCategoriesPage: React.FC<IProps> = ({ onAddCategory}) => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        onAddCategory(values);
        navigate("/admin/categories")
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCategoriesPage

