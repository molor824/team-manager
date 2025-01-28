import { Button, Card, List } from "antd";
import { useEffect, useState } from "react";
import { getApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { useParams } from "react-router-dom";
import NewProjectDrawer from "../components/NewProjectDrawer";

type Project = {
  name: string;
  description: string;
};
export default function ProjectsPage() {
  const { projectId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const { token } = useUser();
  const [openNewProject, setOpenNewProject] = useState(false);

  useEffect(() => {
    getApi("/projects", token).then((ps) => {
      console.log(ps);
      setProjects(ps);
    });
  }, []);

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
            onClose={() => setOpenNewProject(false)}
          />
        </div>
        {projects.length ? (
          <List itemLayout="vertical" bordered>
            {projects.map((project) => (
              <List.Item>
                <div className="flex items-center justify-between gap-16">
                  <span className="text-lg">{project.name}</span>
                  <span>{project.description}</span>
                </div>
              </List.Item>
            ))}
          </List>
        ) : (
          <span className="text-center text-lg text-gray-500">No projects</span>
        )}
      </div>
    </Card>
  );
}
