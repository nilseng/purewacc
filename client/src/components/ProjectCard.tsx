import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPen, faChartLine, faTrash } from "@fortawesome/free-solid-svg-icons";

import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import {
  calculateCostOfEquity,
  calculateProjectWACC,
} from "../services/CalculationService";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteProject } from "../services/ProjectService";

interface IProps {
  project: IProject;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
  setProject?: any;
  projects?: IProject[];
  setProjects?: any;
  riskFreeRate?: IRiskFreeRate;
}

const ProjectCard = ({
  project,
  setProject,
  betas,
  marketReturns,
  riskFreeRates,
  projects,
  setProjects,
}: IProps) => {
  const { getAccessTokenSilently } = useAuth0();

  const [riskFreeRate, setRiskFreeRate] = useState<IRiskFreeRate>();
  const [costOfEquity, setCostOfEquity] = useState<number>();
  const [WACC, setWACC] = useState<number>();

  const onAnalyse = (project: IProject) => {
    setProject(project);
    history.push("/analysis");
  };

  const onEditProject = (project: IProject) => {
    setProject(project);
    history.push("/project-tool");
  };

  const onDeleteProject = async (project: IProject) => {
    const token = await getAccessTokenSilently();
    if (project._id) {
      await deleteProject(token, project._id);
      if (setProjects && projects)
        setProjects(projects.filter((p) => p._id !== project._id));
    }
  };

  const history = useHistory();

  useEffect(() => {
    setRiskFreeRate(riskFreeRates.find((rf) => rf._id === project.rfId));
  }, [project, riskFreeRates]);

  useEffect(() => {
    setCostOfEquity(
      calculateCostOfEquity(project, riskFreeRates, betas, marketReturns)
    );
  }, [project, riskFreeRates, betas, marketReturns]);

  useEffect(() => {
    setWACC(calculateProjectWACC(project, riskFreeRates, betas, marketReturns));
  }, [project, riskFreeRates, betas, marketReturns]);

  return (
    <Card
      key={project._id}
      bg="dark"
      className="border-0 rounded p-2 my-2 small"
    >
      <Row>
        <Col>
          <h6>{project.name}</h6>
        </Col>
      </Row>
      <Row className="my-2">
        <Col className="d-flex flex-direction-row">
          <b>WACC = {WACC ? (WACC * 100).toFixed(2) : "?"} %</b>
        </Col>
      </Row>
      <Row className="text-muted">
        <Col sm={3}>
          Equity = {project.equity}{" "}
          {riskFreeRate && <span>{riskFreeRate.currency}</span>}
        </Col>
        <Col sm={3}>
          Cost of Equity ={" "}
          {costOfEquity ? (costOfEquity * 100)?.toFixed(2) : "?"} %
        </Col>
      </Row>
      <Row className="text-muted">
        <Col sm={3}>
          Debt = {project.debt}{" "}
          {riskFreeRate && <span>{riskFreeRate.currency}</span>}
        </Col>
        <Col sm={3}>
          Cost of Debt ={" "}
          {project.costOfDebt ? (project.costOfDebt * 100).toFixed(2) : "?"} %
        </Col>
        <Col sm={3}>
          Corporate Tax = {project.tax ? (project.tax * 100).toFixed(2) : "?"} %
        </Col>
      </Row>
      {setProject && (
        <Row>
          <Col>
            <Button
              variant="link"
              size="sm"
              className="text-info"
              onClick={() => onEditProject(project)}
            >
              <FaIcon className="mx-1" icon={faPen} />
              Edit
            </Button>
            <Button variant="link" size="sm" onClick={() => onAnalyse(project)}>
              <FaIcon className="mx-1" icon={faChartLine} />
              Analyze
            </Button>
            <Button
              className="text-secondary"
              variant="link"
              size="sm"
              onClick={() => onDeleteProject(project)}
            >
              <FaIcon className="mx-1" icon={faTrash} />
              Delete
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default ProjectCard;
