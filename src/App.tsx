import {
  HomeFilled,
  MenuOutlined,
  ProfileFilled,
  SlidersFilled,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { createContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./components/UserProfile";

const ROUTES = [
  {
    key: "/",
    icon: <HomeFilled />,
    label: "Home",
  },
  {
    key: "/todo",
    icon: <ProfileFilled />,
    label: "Todo",
  },
  {
    key: "/report",
    icon: <SlidersFilled />,
    label: "Reports",
  },
];

export type User = {
  username: string;
  profileUrl?: string;
  email: string;
  phoneNumber?: string;
};
export const UserContext = createContext<
  [User | null, (user: User | null) => void]
>(null as any);

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>({
    username: "jone_the_crazy",
    email: "jone_the_crazy@me.com",
    phoneNumber: "+123456789",
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
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
          <UserProfile />
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
              items={ROUTES.map((route) => ({
                ...route,
                onClick: () => navigate(route.key),
              }))}
            />
          </Sider>
          <Content className="p-8">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </UserContext.Provider>
  );
}
