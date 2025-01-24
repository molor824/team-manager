import { useState } from "react";
import { Card, Button, message } from "antd";
import { deleteApi, getApi } from "../tools/fetchApi";
import { useRequest } from "ahooks";
import TasksList from "../components/TasksList";
import { useUser } from "../components/UserProvider";
import NewTaskDrawer from "../components/NewTaskDrawer";

type Task = {
  id: number;
  title: string;
  description: string;
};

export default function ProjectTasksPage() {
  const { token } = useUser();
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);
  const projectId = 1; 

  const { data: tasks, error, loading, refresh,} = useRequest(
    () => getApi(`/work/project/${projectId}`, token) as Promise<Task[]>,
    { refreshDeps: [token] }
  );

  const {
    run: deleteTask,
    loading: deleting,
    error: deleteError,
  } = useRequest(
    async (taskId: number) => {
      await deleteApi(`/work/project/${projectId}/${taskId}`, token);
      message.success("Task deleted successfully");
      refresh(); 
    },
    { manual: true }
  );

  return (
    <Card>
      {loading ? (
        <h1 className="text-center font-bold text-lg">Loading...</h1>
      ) : error ? (
        <h1 className="text-center font-bold text-lg text-red-500">
          Failed to load tasks.
        </h1>
      ) : (
        <TasksList tasks={tasks || []} onDelete={deleteTask} deleting={deleting} />
      )}

      {deleteError && <p className="text-red-500">{deleteError.message}</p>}

      <div className="mt-4">
        <Button type="primary" onClick={() => setTaskDrawerOpen(true)}>
          New Task
        </Button>
      </div>

      <NewTaskDrawer
        open={taskDrawerOpen}
        projectId={projectId}
        onClose={() => {
          setTaskDrawerOpen(false);
          refresh(); 
        }}
      />
    </Card>
  );
}
