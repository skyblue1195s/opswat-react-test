import React, { useEffect, useState } from "react";
import { Menu, Popconfirm } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getItemMenu } from "@helper/utils";
import { useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";
const MenuComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState("");

  useEffect(() => {
    setDefaultSelectedKeys(location.pathname.replace("/", ""));
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const Logout = (
    <Popconfirm title="Are you sure？" onConfirm={onLogout}>
      <a href="#">Logout</a>
    </Popconfirm>
  );
  const items = [
    getItemMenu("Users", "list-users", <UserOutlined />),
    getItemMenu("Articles", "list-articles", <SettingOutlined />),
    getItemMenu(Logout, "logout", <LogoutOutlined />),
  ];

  const onClick = (e: any) => {
    if (e.key !== "logout") {
      navigate(e.key);
    }
  };

  return (
    <Menu
      theme="dark"
      selectedKeys={[defaultSelectedKeys]}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
};
export default React.memo(MenuComponent);
