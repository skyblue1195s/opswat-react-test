import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import HeaderComponent from "@components/Header";
import MenuComponent from "@components/Menu";
import FooterComponent from "@components/Footer";
import { TOKEN } from "@helper/constants";

const { Sider, Content } = Layout;

export const Auth = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {    
    if (!localStorage.getItem(TOKEN)) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout className="min-h-[100vh]">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <a href="https://www.opswat.com" target="_blank" rel="noopener noreferrer">
          <div className="logo" />
        </a>
        <MenuComponent />
      </Sider>
      <Layout className="site-layout">
        <HeaderComponent />
        <Content className="m-[16px]">
          <Suspense fallback={"..."}>
            <div className="site-layout-background p-[24px] min-h-[360px]">
              <Outlet />
            </div>
          </Suspense>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};
