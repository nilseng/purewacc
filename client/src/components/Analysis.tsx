import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import {
  calculateCostOfEquity,
  calculateProjectWACC,
  calculateWACC,
} from "../services/CalculationService";
import AnalysisChart from "./AnalysisChart";
import ProjectCard from "./ProjectCard";

interface IProps {
  project: IProject;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
}

const Analysis = ({ project, betas, marketReturns, riskFreeRates }: IProps) => {
  const [costOfEquity] = useState(
    calculateCostOfEquity(project, riskFreeRates, betas, marketReturns)
  );

  const debtChartConfig = {
    data: {
      labels: [0, project.debt, (project?.debt || 0) * 2],
      datasets: [
        {
          label: "WACC by Debt",
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.5)",
          data: [
            costOfEquity,
            calculateProjectWACC(project, riskFreeRates, betas, marketReturns),
            calculateWACC(
              project.equity,
              costOfEquity,
              (project.debt || 0) * 2,
              project.costOfDebt,
              project.tax
            ),
          ],
        },
      ],
    },
  };
  return (
    <>
      <Row>
        <Col>
          <ProjectCard
            project={project}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <AnalysisChart data={debtChartConfig.data} />
        </Col>
      </Row>
    </>
  );
};

export default Analysis;
