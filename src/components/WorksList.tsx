import { useState } from "react";
import { useRequest } from "ahooks";
import { Button, Select, List } from "antd";
import { putApi, deleteApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";
import NewTaskDrawer from "./NewTaskDrawer";
import { User, Work } from "../tools/model_types";

type Props = {
  works: Work[];
  projectId: number;
  members: User[];
  refresh: () => void;
};

export default function WorksList({
  works,
  projectId,
  members,
  refresh,
}: Props) {
  const { token } = useUser();
  const [workDrawerOpen, setWorkDrawerOpen] = useState(false);
  const { run: assignMember, loading: assigning } = useRequest(
    async (workId: number, memberId: number) => {
      try {
        await putApi(
          `/works/${workId}/project/${projectId}/assign?v=${memberId}`,
          undefined,
          token
        );
        refresh();
      } catch (err) {
        console.log(err);
      }
    },
    { manual: true }
  );
  const { run: deleteTask, loading: deleteLoading } = useRequest(
    async (workId: number) => {
      await deleteApi(`/works/${workId}/project/${projectId}`, token);
      refresh();
    },
    { manual: true }
  );
  const { run: changeStatus, loading: statusLoading } = useRequest(
    async (workId: number, status: string) => {
      await putApi(
        `/works/${workId}/project/${projectId}/status?v=${status}`,
        undefined,
        token
      );
      refresh();
    },
    { manual: true }
  );

  const listItem = (work: Work) => {
    const assignedMember = members.find(
      (member) => member.id === work.assignedUserId
    );
    return (
      <List.Item
        key={work.id.toString()}
        actions={[
          <Select
            key="select"
            style={{ width: 150 }}
            placeholder="Select User"
            loading={assigning}
            defaultValue={work.assignedUserId}
            onChange={(value) => assignMember(work.id, value)}
          >
            {members.map((member) => (
              <Select.Option key={member.id} value={member.id}>
                {member.fullName}
              </Select.Option>
            ))}
          </Select>,
          <Select
            defaultValue={work.status}
            onChange={(value) => changeStatus(work.id, value)}
            loading={statusLoading}
          >
            <Select.Option value="0">Not Started</Select.Option>
            <Select.Option value="50">In Progress</Select.Option>
            <Select.Option value="100">Completed</Select.Option>
          </Select>,
          <Button
            danger
            type="text"
            loading={deleteLoading}
            onClick={() => deleteTask(work.id)}
          >
            Delete
          </Button>,
        ]}
      >
        <List.Item.Meta
          title={work.title}
          description={
            <>
              <p>{work.description}</p>
              <p>
                {assignedMember
                  ? `Assigned to ${assignedMember.fullName}`
                  : "Unassigned"}
              </p>
            </>
          }
        />
      </List.Item>
    );
  };

  return (
    <List
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Button type="primary" onClick={() => setWorkDrawerOpen(true)}>
            New Task
          </Button>
          <NewTaskDrawer
            open={workDrawerOpen}
            projectId={projectId}
            onClose={() => {
              setWorkDrawerOpen(false);
              refresh();
            }}
          />
        </div>
      }
    >
      {works.map(listItem)}
    </List>
  );
}
