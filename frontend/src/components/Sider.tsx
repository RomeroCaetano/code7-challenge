import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  //@ts-ignore
} from "@ant-design/icons";
import IUser from "../interfaces/IUser";
import "../styles/AppSider.css";
import { Link } from "react-router-dom";
const { Header, Sider } = Layout;
interface AppSider {
  content?: React.ReactElement;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
const AppSider: React.FC<AppSider> = ({ content }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/user");
    setUsers((await res.json())?.data);
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const init = () => {
    fetchUsers();
  };
  useEffect(init, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          {users.map((u, i) => (
            <Menu.Item key={i} icon={<UserOutlined />}>
              <Link to={`/user/${u.id}`}>{u.name} </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        {content && content}
      </Layout>
    </Layout>
  );
};

export default AppSider;
