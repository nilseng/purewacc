import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IProject } from "../models/Project";
import { getProjects } from "../services/ProjectService";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import {
  calculateCostOfEquity,
  calculateProjectWACC,
} from "../services/CalculationService";
import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import Button from "react-bootstrap/Button";

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

  const history = useHistory();

  const [projects, setProjects] = useState(defaultProjects);

  const onAnalyse = (project: IProject) => {
    setProject(project);
    history.push("/analysis");
  };

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
          <Card
            key={project._id}
            bg="dark"
            className="border-0 rounded p-2 my-2 small"
          >
            <Row>
              <Col>
                <h6>{project.name}</h6>
              </Col>
              <Col className="text-right"></Col>
            </Row>
            <Row>
              <Col>
                WACC ={" "}
                {calculateProjectWACC(
                  project,
                  riskFreeRates,
                  betas,
                  marketReturns
                )
                  ?.toFixed(3)
                  ?.toLocaleString()}
              </Col>
              <Col>
                Rf = {riskFreeRates.find((rf) => project.rfId === rf._id)?.rate}
              </Col>
              <Col>E = {project.equity}</Col>
              <Col>
                Re ={" "}
                {calculateCostOfEquity(
                  project,
                  riskFreeRates,
                  betas,
                  marketReturns
                )
                  ?.toFixed(3)
                  ?.toLocaleString()}
              </Col>
              <Col>D = {project.debt}</Col>
              <Col>Rd = {project.costOfDebt}</Col>
              <Col>Tc = {project.tax}</Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="link"
                  size="sm"
                  className="px-0"
                  onClick={() => onAnalyse(project)}
                >
                  Analyze
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
    </>
  );
};

export default ProjectList;
