import { Button, Card, List } from "antd";
import { useParams } from "react-router-dom";
import { getApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { useRequest } from "ahooks";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";

type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
};
type Project = {
  id: number;
  name: string;
  description: string;
  members: User[];
  adminId: number;
};
export default function ProjectPage() {
  const { projectId } = useParams();
  const { token, user } = useUser();
  const { data: project, error } = useRequest(
    () => getApi(`/projects/${projectId}`, token) as Promise<Project>,
    {
      refreshDeps: [projectId, token],
    }
  );
  const adminUser = project?.members.find(({ id }) => id === project.adminId);
  const isProjectAdmin = project && user && project?.adminId === user?.id;

  return (
    <Card>
      {project ? (
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-4 min-w-[300px]">
            <div className="flex gap-4 justify-between">
              <h1 className="font-bold text-lg">{project.name}</h1>
              <Button
                danger
                type="text"
                icon={
                  isProjectAdmin ? (
                    <UsergroupDeleteOutlined />
                  ) : (
                    <UserDeleteOutlined />
                  )
                }
              >
                {isProjectAdmin ? "Delete" : "Leave"}
              </Button>
            </div>
            <p>{project.description}</p>
          </div>
          <List
            itemLayout="vertical"
            bordered
            header={
              <div className="flex gap-4 justify-between">
                <h1 className="font-bold text-lg">Members</h1>
                {isProjectAdmin && (
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
            {adminUser && (
              <List.Item>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-lg">{adminUser.fullName}</h1>
                    <p>{adminUser.email}</p>
                  </div>
                  <p>Admin</p>
                </div>
              </List.Item>
            )}
            {project.members.map(
              ({ id, fullName, email }) =>
                id !== project.adminId && (
                  <List.Item>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h1 className="text-lg">{fullName}</h1>
                        <p>{email}</p>
                      </div>
                      {isProjectAdmin && (
                        <Button danger type="text">
                          Remove
                        </Button>
                      )}
                    </div>
                  </List.Item>
                )
            )}
          </List>
        </div>
      ) : error ? (
        <h1 className="text-center font-bold text-lg">Project not found.</h1>
      ) : (
        <h1 className="text-center font-bold text-lg">Loading...</h1>
      )}
    </Card>
  );
}
