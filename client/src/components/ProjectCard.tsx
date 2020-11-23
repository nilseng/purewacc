import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
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
        <Col>Equity = {project.equity}</Col>
        <Col>
          Cost of Equity ={" "}
          {calculateCostOfEquity(project, riskFreeRates, betas, marketReturns)
            ?.toFixed(3)
            ?.toLocaleString()}
        </Col>
        <Col>Debt = {project.debt}</Col>
        <Col>Cost of Debt = {project.costOfDebt}</Col>
        <Col>Corporate Tax = {project.tax}</Col>
      </Row>
      {setProject && (
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
      )}
    </Card>
  );
};

export default ProjectCard;
