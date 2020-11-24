import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPen, faChartLine } from "@fortawesome/free-solid-svg-icons";

import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import {
  calculateCostOfEquity,
  calculateProjectWACC,
} from "../services/CalculationService";

interface IProps {
  project: IProject;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
  setProject?: any;
}

const ProjectCard = ({
  project,
  setProject,
  betas,
  marketReturns,
  riskFreeRates,
}: IProps) => {
  const onAnalyse = (project: IProject) => {
    setProject(project);
    history.push("/analysis");
  };

  const onEditProject = (project: IProject) => {
    setProject(project);
    history.push("/project-tool");
  };

  const history = useHistory();

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
          <b>
            WACC ={" "}
            {calculateProjectWACC(project, riskFreeRates, betas, marketReturns)
              ?.toFixed(3)
              ?.toLocaleString()}
          </b>
        </Col>
      </Row>
      <Row className="text-muted">
        <Col sm={3}>Equity = {project.equity}</Col>
        <Col sm={3}>
          Cost of Equity ={" "}
          {calculateCostOfEquity(project, riskFreeRates, betas, marketReturns)
            ?.toFixed(3)
            ?.toLocaleString()}
        </Col>
      </Row>
      <Row className="text-muted">
        <Col sm={3}>Debt = {project.debt}</Col>
        <Col sm={3}>Cost of Debt = {project.costOfDebt}</Col>
        <Col sm={3}>Corporate Tax = {project.tax}</Col>
      </Row>
      {setProject && (
        <Row>
          <Col>
            <Button
              variant="link"
              size="sm"
              className="text-info px-0"
              onClick={() => onEditProject(project)}
            >
              <FaIcon className="mx-1" icon={faPen} />
              Edit
            </Button>
            <Button variant="link" size="sm" onClick={() => onAnalyse(project)}>
              <FaIcon className="mx-1" icon={faChartLine} />
              Analyze
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default ProjectCard;
