import { useState } from "react";
import { Card, Select } from "antd";
import WorkColumn from "../components/WorkColumn";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { deleteApi, getApi, putApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { Project, Work } from "../tools/model_types";
import NonLogin from "../components/NonLogin";

export default function Todo() {
  const { token, user } = useUser();
  const [projectId, setProjectId] = useState<number | null>(null);
  const { data: projects } = useRequest(
    async () => {
      if (!token) return;
      let res = (await getApi("/projects", token)) as Project[];
      return res;
    },
    { refreshDeps: [token, user] }
  );
  const {
    data: works,
    loading: worksLoading,
    refresh,
  } = useRequest(
    async () => {
      if (!projectId || !user) return;
      return (await getApi(
        `/works/project/${projectId}/assigned`,
        token
      )) as Work[];
    },
    { refreshDeps: [projectId, token, user] }
  );
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { run: deleteRequest } = useRequest(
    async (id: number) => {
      if (!projectId || !token) return;
      await deleteApi(`/works/${id}/project/${projectId}`, token);
      refresh();
    },
    { manual: true }
  );
  const { run: editRequest } = useRequest(
    async (status: string) => {
      if (!activeCard || !projectId) return;
      await putApi(
        `/works/${activeCard}/project/${projectId}/status?v=${status}`,
        undefined,
        token
      );
      refresh();
    },
    { manual: true }
  );
  if (!user || !projects) return <NonLogin />;

  return (
    <Card>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <Select
          onChange={(value) => {
            console.log(value);
            setProjectId(value);
          }}
          options={projects.map(({ id, name }) => ({ label: name, value: id }))}
          style={{ minWidth: "200px" }}
          allowClear
        />
      </div>
      {projectId ? (
        <div className="flex items-stretch w-full gap-4">
          {works ? (
            <>
              <WorkColumn
                title="Todo"
                icon={<ToolOutlined />} // Pass the appropriate icon
                works={works}
                status="0"
                handleDelete={deleteRequest}
                setActiveCard={setActiveCard}
                onDrop={editRequest}
              />
              <WorkColumn
                title="Doing"
                icon={<PlayCircleOutlined />} // Pass the appropriate icon
                works={works}
                status="50"
                handleDelete={deleteRequest}
                setActiveCard={setActiveCard}
                onDrop={editRequest}
              />
              <WorkColumn
                title="Done"
                icon={<CheckCircleOutlined />} // Pass the appropriate icon
                works={works}
                status="100"
                handleDelete={deleteRequest}
                setActiveCard={setActiveCard}
                onDrop={editRequest}
              />
            </>
          ) : (
            <h1 className="text-center text-lg text-gray-500">
              {worksLoading ? "Loading..." : "No works found"}
            </h1>
          )}
        </div>
      ) : (
        <h1 className="text-center text-xl">No project selected</h1>
      )}
    </Card>
  );
}
