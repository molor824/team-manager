import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

export type User = {
  username: string;
  profileUrl?: string;
};
export type Props = {
  user?: User;
};
export default function UserProfile({ user }: Props) {
  return user ? (
    <Button
      type="text"
      size="large"
      className="overflow-hidden flex items-center gap-4"
    >
      <p className="font-bold">{user.username}</p>
      {user.profileUrl ? (
        <img
          src={user.profileUrl}
          alt={user.username}
          className="object-cover max-w-[30px]"
        />
      ) : (
        <UserOutlined alt={user.username} />
      )}
    </Button>
  ) : (
    <Button type="primary" size="large">
      Sign Up
    </Button>
  );
}
