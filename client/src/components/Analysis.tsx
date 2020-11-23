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
import AnalysisChart, { ChartTypes } from "./AnalysisChart";
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

  const financingMixChartConfig = project
    ? {
        data: {
          labels: ["Equity", "Debt"],
          datasets: [
            {
              label: "Financing mix",
              borderColor: "rgba(75,192,192,0)",
              backgroundColor: ["rgba(75,192,192,0.8)", "rgba(0,150,192,0.8)"],
              data: [project.equity, project.debt],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Financing mix",
          },
          legend: {
            position: "bottom",
          },
        },
      }
    : undefined;

  const equityChartConfig = project
    ? {
        data: {
          labels: Array.from(Array(11).keys()).map(
            (i) => ((project.equity || 0) * i * 2) / 10
          ),
          datasets: [
            {
              label: "WACC by Equity",
              borderWidth: 1,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0)",
              pointRadius: 2,
              pointBackgroundColor: "rgba(75,192,192,1)",
              data: Array.from(Array(11).keys()).map((i) =>
                calculateWACC(
                  ((project.equity || 0) * i * 2) / 10,
                  costOfEquity,
                  project.debt,
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
            text: "WACC by Equity",
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Equity",
                },
                gridLines: {
                  display: false,
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
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      }
    : undefined;

  const debtChartConfig = project
    ? {
        data: {
          labels: Array.from(Array(11).keys()).map(
            (i) => ((project.debt || 0) * i * 2) / 10
          ),
          datasets: [
            {
              label: "WACC by Debt",
              borderWidth: 1,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0)",
              pointRadius: 2,
              pointBackgroundColor: "rgba(75,192,192,1)",
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
                gridLines: {
                  display: false,
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
                gridLines: {
                  display: false,
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
          {financingMixChartConfig && (
            <AnalysisChart
              config={financingMixChartConfig}
              chartType={ChartTypes.Doughnut}
            />
          )}
        </Col>
        <Col sm={4}>
          {equityChartConfig && <AnalysisChart config={equityChartConfig} />}
        </Col>
        <Col sm={4}>
          {debtChartConfig && <AnalysisChart config={debtChartConfig} />}
        </Col>
      </Row>
    </>
  );
};

export default Analysis;
