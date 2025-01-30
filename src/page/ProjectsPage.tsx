import { Button, Card, List } from "antd";
import { useState } from "react";
import { getApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import NewProjectDrawer from "../components/NewProjectDrawer";
import { useRequest } from "ahooks";
import { Link } from "react-router-dom";

type Project = {
  id: number;
  name: string;
  description: string;
};
export default function ProjectsPage() {
  const { token } = useUser();
  const [openNewProject, setOpenNewProject] = useState(false);
  const { data: projects, run } = useRequest(
    () => getApi("/projects", token) as Promise<Project[]>,
    {
      refreshDeps: [token],
    }
  );

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button
            type="primary"
            size="large"
            onClick={() => setOpenNewProject(true)}
          >
            New
          </Button>
          <NewProjectDrawer
            open={openNewProject}
            onClose={() => {
              setOpenNewProject(false);
              run();
            }}
          />
        </div>
        {projects?.length ? (
          <List itemLayout="vertical" bordered>
            {projects.map((project) => (
              <List.Item>
                <div className="flex items-center justify-between gap-16">
                  <span className="text-lg">{project.name}</span>
                  <div className="flex gap-8 items-center">
                    <span className="max-w-[200px] overflow-ellipsis">
                      {project.description}
                    </span>
                    <Link to={`/projects/${project.id}`}>View</Link>
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
        ) : (
          <span className="text-center text-lg text-gray-500">
            {projects ? "No projects" : "Loading..."}
          </span>
        )}
      </div>
    </Card>
  );
}
