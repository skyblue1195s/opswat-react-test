import { PROFILE_INFO } from "@helper/constants";
import { IUserDataType } from "@interfaces/DataType";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Header } = Layout;

const HeaderComponent = () => {
  const [user, setUser] = useState<IUserDataType>();
 
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(PROFILE_INFO) || ''))
  }, []);

  return (
    <Header className="site-layout-background p-0">
      <h3 className="float-right pr-8 capitalize"><Link to={'/profile'}>{user?.username}</Link></h3>
    </Header>
  );
};

export default React.memo(HeaderComponent);
