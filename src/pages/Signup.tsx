import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { signup } from '../api/auth';
interface IProps {
    onSubmit: Function
  }
  const SignUpPage: React.FC<IProps> = ({ onSubmit}) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });

    };
  
    const handleSubmit = () => {
        onSubmit(formData)
    }
  
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
              <Form layout="vertical" onFinish={handleSubmit}   style={{margin: '30px'}}>
        <Form.Item label="Name" required
           style={{width: '400px'}}>
          <Input name="name" value={formData.name} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input name="email" value={formData.email} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password name="password" value={formData.password} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Confirm Password" required>
          <Input.Password
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  };

export default SignUpPage