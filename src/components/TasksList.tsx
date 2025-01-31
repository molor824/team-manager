import { useRequest } from "ahooks";
import { List, Button, message } from "antd";
import { deleteApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";
import { useState } from "react";
import NewTaskDrawer from "./NewTaskDrawer";

type Work = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  works: Work[];
  projectId: number;
  refresh: () => void;
};

export default function TasksList({ works, projectId, refresh }: Props) {
  const { token } = useUser();
  const { run, loading } = useRequest(
    async (workId: number) => {
      await deleteApi(`/works/${workId}/project/${projectId}`, token);
      message.success("Task deleted successfully");
      refresh();
    },
    { manual: true }
  );
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);

  return (
    <List
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Button type="primary" onClick={() => setTaskDrawerOpen(true)}>
            New task
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
            <Button
              key="delete"
              danger
              loading={loading}
              onClick={() => run(work.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta title={work.title} description={work.description} />
        </List.Item>
      )}
    />
  );
}
