import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api/auth';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onFinishFailed = (errorInfo: any) => {
    setEmailError(errorInfo.errorFields.find((field: any) => field.name[0] === 'email')[0]?.errors[0]);
    setPasswordError(errorInfo.errorFields.find((field: any) => field.name[0] === 'password')[0]?.errors[0])
  };

  const handleSubmit = async () => {
    try {
      const response = await signin(formData);
      if (response.status === 200) {
        console.log(response);
        navigate('/'); // Chuyển hướng đến trang dashboard
      } 
    } catch (error:any) {
      const errors = error.response.status;
      console.log(errors);
      
      if (errors === 402) {
        setPasswordError('Sai mật khẩu');
        setEmailError('');
      } else if (errors === 401) {
        setEmailError('Email không tồn tại');
        setPasswordError('');
      } else{
        setError('Đã có lỗi xảy ra');
        console.log(error);
        setEmailError('');
        setPasswordError('');
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <Form layout="vertical" onFinish={handleSubmit} onFinishFailed={onFinishFailed}
  style={{margin: '30px'}}>
    <Form.Item
    style={{width: '400px'}}
      label="Email"
      name="email"
      required
      help={emailError}
      validateStatus={emailError ? "error" : ""}
      rules={[
        {
          required: true,
          message: "Vui lòng nhập email của bạn!",
        },
        {
          type: "email",
          message: "Nhập đúng định dạng email!",
        },
      ]}
    >
      <Input name="email" value={formData.email} onChange={handleInputChange} />
    </Form.Item>
    <Form.Item

      label="Password"
      name="password"
      required
      help={passwordError}
      validateStatus={passwordError ? "error" : ""}
      rules={[
        {
          required: true,
          message: "Vui lòng nhập mật khẩu của bạn!!",
        },
        {
          min: 6,
          message: "Password phải có ít nhất 6 ký tự",
        },
      ]}
    >
      <Input.Password name="password" value={formData.password} onChange={handleInputChange} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Sign In
      </Button>
    </Form.Item>
  </Form>
</div>
  );
};

export default SignInPage;