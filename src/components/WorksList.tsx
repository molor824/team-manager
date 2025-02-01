import { useState } from "react";
import { useRequest } from "ahooks";
import { Button, Select, List, message } from "antd";
import { putApi, deleteApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";
import NewTaskDrawer from "./NewTaskDrawer";
import { User, Work } from "../tools/model_types";

type Props = {
  works: Work[];
  projectId: number;
  adminId: number;
  members: User[];
  refresh: () => void;
};

export default function WorksList({
  works,
  projectId,
  adminId,
  members,
  refresh,
}: Props) {
  const { token } = useUser();
  const [loadingTasks, setLoadingTasks] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedUser, setSelectedUser] = useState<{
    [key: number]: number | null;
  }>({});
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);

  const assignUser = async (taskId: number) => {
    if (!selectedUser[taskId]) return;
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));

    try {
      await putApi(
        `/works/${taskId}/project/${projectId}/assign`,
        { userId: selectedUser[taskId] },
        token
      );
      message.success("User assigned successfully");
      refresh();
    } catch (error) {
      console.error("Error assigning user:", error);
      message.error("Failed to assign user");
    } finally {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  const { run: deleteTask, loading: deleteLoading } = useRequest(
    async (workId: number) => {
      await deleteApi(`/works/${workId}/project/${projectId}`, token);
      message.success("Task deleted successfully");
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

  return (
    <List
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Button type="primary" onClick={() => setTaskDrawerOpen(true)}>
            New Task
          </Button>
          <NewTaskDrawer
            open={taskDrawerOpen}
            projectId={projectId}
            onClose={() => {
              setTaskDrawerOpen(false);
              refresh();
            }}
          />
        </div>
      }
      dataSource={works}
      renderItem={(work) => (
        <List.Item
          actions={[
            <Select
              key="select"
              style={{ width: 150 }}
              placeholder="Select User"
              onChange={(value) =>
                setSelectedUser({ ...selectedUser, [work.id]: value })
              }
              value={selectedUser[work.id]}
            >
              {members
                .filter((member) => member.id !== adminId) // Exclude admin
                .map((member) => (
                  <Select.Option key={member.id} value={member.id}>
                    {member.fullName}
                  </Select.Option>
                ))}
            </Select>,
            <Button
              key="assign"
              type="primary"
              onClick={() => assignUser(work.id)}
              loading={loadingTasks[work.id]}
            >
              Assign
            </Button>,
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
                  {work.assignedUserId &&
                  members.find((member) => member.id === work.assignedUserId)
                    ? `Assigned to: ${
                        members.find(
                          (member) => member.id === work.assignedUserId
                        )!.fullName
                      }`
                    : "Unassigned"}
                </p>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
}
