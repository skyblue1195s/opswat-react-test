import { LoadingOutlined } from "@ant-design/icons";
import { http } from "@helper/config";
import { MESSAGE_TYPE, PROFILE_INFO, TOKEN } from "@helper/constants";
import { NotificationConfig } from "@helper/utils";
import { authService } from "@services/auth";
import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const antIcon = (
    <LoadingOutlined className="text-white" style={{ fontSize: 24 }} spin />
  );

  const onFinish = (values: any) => {
    setLoading(true);
    authService
      .Login(values)
      .then((rs:any) => {
        setLoading(true);
        const { token } = rs.user;
        localStorage.setItem(TOKEN, token);
        localStorage.setItem(PROFILE_INFO, JSON.stringify(rs.user));
        http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        navigate("/profile");
        NotificationConfig(MESSAGE_TYPE.SUCCESS, "Login success");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Form name="login-form" onFinish={onFinish}>
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
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

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-indigo-600"
            >
              {!loading ? "LOGIN" : <Spin indicator={antIcon} />}
            </Button>
          </Form.Item>
          
          <Form.Item className="float-right" name="" valuePropName="checked">
            <Link to={'/register'}>Create account</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Login;
