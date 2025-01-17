import {
  EditFilled,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { User, UserContext } from "../App";
import { useContext } from "react";

export default function UserProfile() {
  const [user, setUser] = useContext(UserContext);
  const getProfile = (user: User) =>
    user.profileUrl ? (
      <img
        src={user.profileUrl}
        alt={user.username}
        className="object-cover max-w-[30px]"
      />
    ) : (
      <UserOutlined alt={user.username} />
    );
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
        setUser(null);
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
            {getProfile(user)}
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
