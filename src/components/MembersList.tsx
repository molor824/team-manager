import { UserAddOutlined } from "@ant-design/icons";
import { Button, List } from "antd";

type Props = {
  admin: boolean;
  adminMember: {
    id: number;
    fullName: string;
    email: string;
  };
  members: {
    id: number;
    fullName: string;
    email: string;
  }[];
};

export default function MembersList({ adminMember, admin, members }: Props) {
  return (
    <List
      itemLayout="vertical"
      bordered
      header={
        <div className="flex gap-4 justify-between">
          <h1 className="font-bold text-lg">Members</h1>
          {admin && (
            <div className="flex gap-4">
              <Button type="primary" icon={<UserAddOutlined />}>
                Invite
              </Button>
            </div>
          )}
        </div>
      }
      className="flex-1 min-w-[300px]"
    >
      <List.Item>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg">{adminMember.fullName}</h1>
            <p>{adminMember.email}</p>
          </div>
          <p>Admin</p>
        </div>
      </List.Item>
      {members.map(
        ({ id, fullName, email }) =>
          id !== adminMember.id && (
            <List.Item>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-lg">{fullName}</h1>
                  <p>{email}</p>
                </div>
                {admin && (
                  <Button danger type="text">
                    Remove
                  </Button>
                )}
              </div>
            </List.Item>
          )
      )}
    </List>
  );
}
