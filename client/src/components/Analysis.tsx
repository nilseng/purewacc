import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";

import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import {
  calculateCostOfEquity,
  calculateWACC,
} from "../services/CalculationService";
import AnalysisChart from "./AnalysisChart";
import ProjectCard from "./ProjectCard";
import { faList } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  project: IProject;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
}

const Analysis = ({ project, betas, marketReturns, riskFreeRates }: IProps) => {
  const [costOfEquity] = useState(
    project
      ? calculateCostOfEquity(project, riskFreeRates, betas, marketReturns)
      : undefined
  );

  const debtChartConfig = project
    ? {
        data: {
          labels: Array.from(Array(11).keys()).map(
            (i) => ((project.debt || 0) * i * 2) / 10
          ),
          datasets: [
            {
              label: "WACC by Debt",
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.5)",
              data: Array.from(Array(11).keys()).map((i) =>
                calculateWACC(
                  project.equity,
                  costOfEquity,
                  ((project.debt || 0) * i * 2) / 10,
                  project.costOfDebt,
                  project.tax
                )
              ),
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "WACC by Debt",
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Debt",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "WACC",
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      }
    : undefined;
  return (
    <>
      {!project && (
        <Row>
          <Col>
            <p>Could not find the project.</p>
            <Link className="text-light mr-2" to="/projects">
              <FaIcon icon={faList} style={{ marginRight: "0.4rem" }}></FaIcon>
              Projects
            </Link>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {project && (
            <ProjectCard
              project={project}
              betas={betas}
              marketReturns={marketReturns}
              riskFreeRates={riskFreeRates}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {debtChartConfig && <AnalysisChart config={debtChartConfig} />}
        </Col>
      </Row>
    </>
  );
};

export default Analysis;
