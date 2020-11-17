import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import AnalysisChart, { ChartTypes } from "./AnalysisChart";

interface IProps {
  project: IProject;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
}

const Analysis = ({ project, betas, marketReturns, riskFreeRates }: IProps) => {
  return (
    <>
      <Row>
        <Col sm={4}>
          <AnalysisChart chartType={ChartTypes.Line} />
        </Col>
        <Col sm={4}>
          <AnalysisChart chartType={ChartTypes.Bar} />
        </Col>
        <Col sm={4}>
          <AnalysisChart chartType={ChartTypes.Doughnut} />
        </Col>
        <Col sm={4}>
          <AnalysisChart />
        </Col>
      </Row>
    </>
  );
};

export default Analysis;
