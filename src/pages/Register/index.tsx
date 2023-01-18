import { LoadingOutlined } from "@ant-design/icons";
import { http } from "@helper/config";
import { MESSAGE_TYPE, PROFILE_INFO, TOKEN } from "@helper/constants";
import { NotificationConfig } from "@helper/utils";
import { authService } from "@services/auth";
import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
function Register() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const antIcon = (
    <LoadingOutlined className="text-white" style={{ fontSize: 24 }} spin />
  );

  const onFinish = (values: any) => {
    setLoading(true);
    authService
      .Register(values)
      .then((rs:any) => {
        setLoading(true);
        const { token } = rs.user;
        localStorage.setItem(TOKEN, token);
        localStorage.setItem(PROFILE_INFO, JSON.stringify(rs.user));
        http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        navigate("/profile");
        NotificationConfig(MESSAGE_TYPE.SUCCESS, "Register success");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Form name="login-form" onFinish={onFinish}>
          <p className="form-title">Register account</p>
          <p>Create new account</p>

          <Form.Item
            name={["username"]}
            rules={[
              {
                type: "string",
                required: true,
                message: "Please enter your username.",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          
          <Form.Item
            name={["email"]}
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter a valid email address.",
              },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            name={["password"]}
            rules={[{ required: true, message: "Please enter your password." }]}
            className="mt-4"
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

        <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Confirm password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Enter confirm password" />
      </Form.Item>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-indigo-600"
            >
              {!loading ? "Register" : <Spin indicator={antIcon} />}
            </Button>
          </Form.Item>
          
          <Form.Item className="float-right" name="" valuePropName="checked">
            <Link to={'/login'}>Login</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Register;
