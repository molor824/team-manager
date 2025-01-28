import { Card } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";

type Project = {
  name: string;
  description: string;
};
export default function ProjectPage() {
  const { projectId } = useParams();
  const { token } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getApi(`/${projectId}`, token)
      .then(setProject)
      .catch((res) => {
        if (res.status === 404) {
          setErrorMessage("Project not found");
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  }, [projectId, token]);

  return <Card></Card>;
}
