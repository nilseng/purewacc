import React from "react";
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
      <p>{JSON.stringify(project)}</p>
      <AnalysisChart />
    </>
  );
};

export default Analysis;
