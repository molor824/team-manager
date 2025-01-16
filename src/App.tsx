import {
  HomeFilled,
  MenuOutlined,
  ProfileFilled,
  SlidersFilled,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Notification from "./components/Notification";

const ROUTES = [
  {
    path: "/",
    icon: <HomeFilled />,
    label: "Home",
  },
  {
    path: "/todo",
    icon: <ProfileFilled />,
    label: "Todo",
  },
  {
    path: "/report",
    icon: <SlidersFilled />,
    label: "Reports",
  },
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className="w-screen min-h-screen">
      <Header className="bg-white flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Button
            type="text"
            size="large"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <h1 className="text-3xl font-bold">Team Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <Notification />
          <UserProfile />
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          theme="light"
          width={200}
          className="overflow-hidden px-4"
          collapsed={collapsed}
          collapsible
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            items={ROUTES.map(({ path, icon, label }) => ({
              key: path,
              icon,
              label,
              onClick: () => navigate(path),
            }))}
          />
        </Sider>
        <Content className="p-8">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
