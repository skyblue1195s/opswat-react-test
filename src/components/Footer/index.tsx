import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="text-center">
      React Test {new Date().getFullYear()} Created by Dieu Tran
    </Footer>
  );
};

export default React.memo(FooterComponent);
