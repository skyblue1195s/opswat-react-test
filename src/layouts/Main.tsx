import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { TOKEN } from "@helper/constants";

const { Content } = Layout;

export const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {    
    if (localStorage.getItem(TOKEN)) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Layout className="min-h-[100vh]">
      <Content className="m-[16px]">
        <Suspense fallback={"..."}>
          <div className="site-layout-background p-[24px] min-h-[360px]">
            <Outlet />
          </div>
        </Suspense>
      </Content>
    </Layout>
  );
};
