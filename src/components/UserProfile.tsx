import {
  EditFilled,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export default function UserProfile() {
  const { user, setToken } = useUser();
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "edit",
      icon: <EditFilled />,
      label: "Edit profile",
      onClick: () => navigate("/edit"),
    },
    {
      key: "signout",
      icon: <UserDeleteOutlined />,
      label: "Sign out",
      danger: true,
      onClick: () => {
        setToken("");
        navigate("/signup");
      },
    },
  ];

  return user ? (
    <>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <Button type="text" size="large">
          <Space>
            <p className="font-bold">{user.username}</p>
            <UserOutlined alt={user.username} />
          </Space>
        </Button>
      </Dropdown>
    </>
  ) : (
    <Button type="primary" size="large" onClick={() => navigate("/signup")}>
      Sign Up
    </Button>
  );
}
