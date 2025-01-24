import {
  EditFilled,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export default function UserProfile() {
  const { user, setToken } = useUser();
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "edit",
      icon: <EditFilled />,
      label: "Edit Profile",
      onClick: () => navigate("/edit-profile"),
    },
    {
      key: "logout",
      icon: <UserDeleteOutlined />,
      label: "Log Out",
      danger: true,
      onClick: () => {
        setToken("");
        navigate("/login");
      },
    },
  ];

  return user ? (
    <>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <Button type="text" size="large">
          <div className="flex items-center gap-4">
            <div className="text-end leading-none">
              <p className="font-bold">{user.fullName}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            <UserOutlined alt={user.fullName} />
          </div>
        </Button>
      </Dropdown>
    </>
  ) : (
    <Button type="primary" size="large" onClick={() => navigate("/login")}>
      Log In
    </Button>
  );
}
