import { useState } from "react";
import { useRequest } from "ahooks";
import { Button, Select, List, message } from "antd";
import { putApi, deleteApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";
import NewTaskDrawer from "./NewTaskDrawer";

type Member = {
  id: number;
  fullName: string;
  email: string;
};

type Work = {
  id: number;
  title: string;
  description: string;
  assignedUserId: number | null;
};

type Props = {
  works: Work[];
  projectId: number;
  adminId: number;
  members: Member[];
  refresh: () => void;
};

export default function TasksList({ works, projectId, adminId, members, refresh }: Props) {
  const { token } = useUser();
  const [loadingTasks, setLoadingTasks] = useState<{ [key: number]: boolean }>({});
  const [selectedUser, setSelectedUser] = useState<{ [key: number]: number | null }>({});
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);

  const assignUser = async (taskId: number) => {
    if (!selectedUser[taskId]) return;
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));

    try {
      await putApi(`/works/${taskId}/project/${projectId}/assign`, { userId: selectedUser[taskId] }, token);
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
      renderItem={(task) => (
        <List.Item
          actions={[
            <Select
              key="select"
              style={{ width: 150 }}
              placeholder="Select User"
              onChange={(value) => setSelectedUser({ ...selectedUser, [task.id]: value })}
              value={selectedUser[task.id]}
            >
              {members
                .filter((member) => member.id !== adminId) // Exclude admin
                .map((member) => (
                  <Select.Option key={member.id} value={member.id}>
                    {member.fullName}
                  </Select.Option>
                ))}
            </Select>,
            <Button key="assign" type="primary" onClick={() => assignUser(task.id)} loading={loadingTasks[task.id]}>
              Assign
            </Button>,
            <Button key="delete" danger loading={deleteLoading} onClick={() => deleteTask(task.id)}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={task.title}
            description={
              <>
                <p>{task.description}</p>
                <p>
                  Assigned to:{" "}
                  {task.assignedUserId ? members.find((user) => user.id === task.assignedUserId)?.fullName : "Unassigned"}
                </p>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
}
