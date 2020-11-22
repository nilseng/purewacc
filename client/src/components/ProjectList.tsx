import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IProject } from "../models/Project";
import { getProjects } from "../services/ProjectService";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import ProjectCard from "./ProjectCard";

interface IProps {
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
  setProject: any;
}

const defaultProjects: IProject[] = [];

const ProjectList = ({
  betas,
  marketReturns,
  riskFreeRates,
  setProject,
}: IProps) => {
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
      {projects &&
        projects.map((project: IProject) => (
          <ProjectCard
            key={project._id}
            project={project}
            setProject={setProject}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
          />
        ))}
    </>
  );
};

export default ProjectList;
