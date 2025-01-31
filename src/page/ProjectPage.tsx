import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { deleteApi, getApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { useRequest } from "ahooks";
import MembersList from "../components/MembersList";
import ProjectInfo from "../components/ProjectInfo";
import NonLogin from "../components/NonLogin";
import TasksList from "../components/TasksList";

type Status = "0" | "50" | "100";
type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
};
type Work = {
  id: number;
  title: string;
  description: string;
  status: Status;
  projectId: number;
  assignedUserId: number;
};
type Project = {
  id: number;
  name: string;
  description: string;
  members: User[];
  adminId: number;
  works: Work[];
};
export default function ProjectPage() {
  const { projectId } = useParams();
  const { token, user } = useUser();
  const navigate = useNavigate();
  const {
    data: project,
    error,
    refresh,
  } = useRequest(
    () => getApi(`/projects/${projectId}`, token) as Promise<Project>,
    {
      refreshDeps: [projectId, token],
    }
  );
  const {
    run: deleteProject,
    error: deleteError,
    loading,
  } = useRequest(
    () =>
      deleteApi(`/projects/${projectId}`, token)
        .then((_) => navigate("/projects"))
        .catch((_) =>
          Promise.reject(
            new Error("Something went wrong trying to delete this project")
          )
        ),
    { manual: true }
  );
  if (!user) {
    return <NonLogin />;
  }
  const adminMember = project?.members.find(({ id }) => id === project.adminId);
  const isProjectAdmin = project && user && project?.adminId === user?.id;

  return (
    <Card>
      {project ? (
        <>
          {deleteError && <p className="text-red-500">{deleteError.message}</p>}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-8">
              <ProjectInfo
                admin={isProjectAdmin!}
                name={project.name}
                description={project.description}
                onDelete={deleteProject}
                loading={loading}
              />
              <MembersList
                adminMember={adminMember!}
                members={project.members}
                admin={isProjectAdmin!}
              />
            </div>
            <TasksList
              works={project.works}
              refresh={refresh}
              projectId={project.id}
            />
          </div>
        </>
      ) : error ? (
        <h1 className="text-center font-bold text-lg">Project not found.</h1>
      ) : (
        <h1 className="text-center font-bold text-lg">Loading...</h1>
      )}
    </Card>
  );
}
