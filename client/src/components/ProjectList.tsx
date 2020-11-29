import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
  riskFreeRate?: IRiskFreeRate;
}

const defaultProjects: IProject[] = [];

const ProjectList = ({
  betas,
  marketReturns,
  riskFreeRates,
  setProject,
  riskFreeRate,
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
      <h5>Projects</h5>
      {projects &&
        projects.map((project: IProject) => (
          <ProjectCard
            key={project._id}
            project={project}
            setProject={setProject}
            projects={projects}
            setProjects={setProjects}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
            riskFreeRate={riskFreeRate}
          />
        ))}
    </>
  );
};

export default ProjectList;
