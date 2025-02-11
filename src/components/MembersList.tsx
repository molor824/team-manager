import { List } from "antd";
import MemberInvite from "./MemberInvite";
import MemberRemove from "./MemberRemove";

type Props = {
  projectId: number;
  adminId: number;
  admin: boolean;
  members: {
    id: number;
    fullName: string;
    email: string;
  }[];
  refresh: () => void;
};

export default function MembersList({
  projectId,
  adminId,
  admin,
  members,
  refresh,
}: Props) {
  const adminMember = members.find(({ id }) => id === adminId);
  if (!adminMember) throw new Error("adminId does not exist in members");

  return (
    <List
      itemLayout="vertical"
      bordered
      header={
        <div className="flex gap-4 justify-between">
          <h1 className="font-bold text-lg">Members</h1>
          {admin && <MemberInvite projectId={projectId} onInvite={refresh} />}
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
            <List.Item key={id}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-lg">{fullName}</h1>
                  <p>{email}</p>
                </div>
                {admin && (
                  <MemberRemove
                    projectId={projectId}
                    memberId={id}
                    onRemove={refresh}
                  />
                )}
              </div>
            </List.Item>
          )
      )}
    </List>
  );
}
