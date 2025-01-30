import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { deleteApi, getApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { useRequest } from "ahooks";
import MembersList from "../components/MembersList";
import ProjectInfo from "../components/ProjectInfo";
import NonLogin from "../components/NonLogin";

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
  const navigate = useNavigate();
  const {
    data: project,
    error,
    run,
  } = useRequest(
    () => getApi(`/projects/${projectId}`, token) as Promise<Project>,
    {
      refreshDeps: [projectId, token],
    }
  );
  const {
    run: leaveProject,
    error: leaveError,
    loading,
  } = useRequest(
    () =>
      deleteApi(`/projects/${projectId}/member/${user!.id}`, token)
        .then((_) => navigate("/projects"))
        .catch((_) =>
          Promise.reject(
            new Error("Something went wrong trying to leave this project")
          )
        ),
    { manual: true }
  );
  if (!user) {
    return <NonLogin />;
  }
  const isProjectAdmin = project && user && project?.adminId === user?.id;

  return (
    <Card>
      {project ? (
        <>
          {leaveError && <p className="text-red-500">{leaveError.message}</p>}
          <div className="flex flex-wrap gap-8">
            <ProjectInfo
              admin={isProjectAdmin!}
              name={project.name}
              description={project.description}
              onDelete={leaveProject}
              loading={loading}
            />
            <MembersList
              projectId={project.id}
              adminId={project.adminId}
              members={project.members}
              admin={isProjectAdmin!}
              projectRequest={run}
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
