import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IProject } from "../models/Project";
import { getProjects } from "../services/ProjectService";

const defaultProjects: IProject[] = [];

const ProjectList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    getAccessTokenSilently().then((token) => setToken(token));
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (token) getProjects(token).then((res: any) => setProjects(res));
  }, [token]);

  return (
    <>
      <Link
        to="/project-tool"
        className="btn btn-outline-primary text-light my-4"
        style={{ textDecoration: "none" }}
      >
        <FaIcon icon={faPlus} className="mr-2"></FaIcon>
        New Project
      </Link>
      <h5>Projects</h5>
      <ul>
        {projects &&
          projects.map((project: IProject) => <li>{project.name}</li>)}
      </ul>
      {projects && projects.length === 0 && (
        <p>Seems like you have no projects yet.</p>
      )}
    </>
  );
};

export default ProjectList;
