import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import AnalysisChart from "./AnalysisChart";

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
        <Col>
          <AnalysisChart />
        </Col>
        <Col>
          <AnalysisChart />
        </Col>
        <Col>
          <AnalysisChart />
        </Col>
      </Row>
    </>
  );
};

export default Analysis;
