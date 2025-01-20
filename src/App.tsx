import { HomeFilled, MenuOutlined, ProfileFilled } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className="w-screen min-h-screen">
      <Sider
        trigger={null}
        className="overflow-hidden"
        collapsed={collapsed}
        collapsible
      >
        <div className="relative p-8 text-white font-bold text-center text-3xl">
          <div
            className={`ease-in-out duration-200 ${
              collapsed ? "translate-x-[400px]" : ""
            }`}
          >
            Task
            <br />
            Manager
          </div>
          <div
            className={`absolute top-8 left-50% ease-in-out duration-200 ${
              !collapsed ? "translate-x-[-400px]" : "translate-x-[-30%]"
            }`}
          >
            T <br /> M
          </div>
        </div>
        <Menu
          theme="dark"
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
        <Layout>
          <Header className="bg-slate-200">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Header>
          <Content className="p-8">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;   
