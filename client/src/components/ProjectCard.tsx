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
        <Col className="text-right"></Col>
      </Row>
      <Row>
        <Col>
          WACC ={" "}
          {calculateProjectWACC(project, riskFreeRates, betas, marketReturns)
            ?.toFixed(3)
            ?.toLocaleString()}
        </Col>
        <Col>
          Rf = {riskFreeRates.find((rf) => project.rfId === rf._id)?.rate}
        </Col>
        <Col>E = {project.equity}</Col>
        <Col>
          Re ={" "}
          {calculateCostOfEquity(project, riskFreeRates, betas, marketReturns)
            ?.toFixed(3)
            ?.toLocaleString()}
        </Col>
        <Col>D = {project.debt}</Col>
        <Col>Rd = {project.costOfDebt}</Col>
        <Col>Tc = {project.tax}</Col>
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
