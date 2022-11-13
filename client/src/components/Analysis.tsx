import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { faList } from "@fortawesome/free-solid-svg-icons";
import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import Container from "react-bootstrap/Container";
import { Doughnut, Line } from "react-chartjs-2";
import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import { calculateCostOfEquity, calculateWACC } from "../services/CalculationService";
import ProjectCard from "./ProjectCard";

interface IProps {
  project: IProject;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
  riskFreeRate: IRiskFreeRate;
}

const Analysis = ({ project, betas, marketReturns, riskFreeRates, riskFreeRate }: IProps) => {
  const [costOfEquity, setCostOfEquity] = useState(calculateCostOfEquity(project, riskFreeRates, betas, marketReturns));

  useEffect(() => {
    setCostOfEquity(calculateCostOfEquity(project, riskFreeRates, betas, marketReturns));
  }, [project, riskFreeRates, betas, marketReturns]);

  const toolTipConfig = {
    callbacks: {
      label: (tooltipItem: TooltipItem<"line">) => `${tooltipItem.label}: ${tooltipItem.formattedValue}`,
      title: () => "",
    },
  };

  const financingMixChartConfig: { data: ChartData<"doughnut">; options: ChartOptions<"doughnut"> } = {
    data: {
      labels: ["Equity", "Debt"],
      datasets: [
        {
          label: "Financing mix",
          borderColor: ["rgba(75,192,192,1)", "rgba(0,150,192,1)"],
          borderWidth: 1,
          backgroundColor: ["rgba(75,192,192,0.2)", "rgba(0,150,192,0.2)"],
          data: [project.equity!, project.debt!],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Financing mix",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  };

  const equityChartConfig: { data: ChartData<"line">; options: ChartOptions<"line"> } = {
    data: {
      labels: Array.from(Array(11).keys()).map((i) => ((project.equity || 0) * i * 2) / 10),
      datasets: [
        {
          label: "Current WACC",
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,150,192,1)",
          data: [
            {
              x: project.equity!,
              y: calculateWACC(project.equity, costOfEquity, project.debt, project.costOfDebt, project.tax),
            },
          ],
        },
        {
          label: "WACC",
          borderWidth: 1,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0)",
          pointRadius: 1,
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
      plugins: {
        title: {
          display: true,
          text: "WACC by Equity",
        },
        legend: {
          display: false,
        },
        tooltip: toolTipConfig,
      },
      scales: {
        Equity: {
          axis: "x",
          grid: {
            display: false,
          },
        },
        WACC: {
          axis: "y",
          suggestedMin: 0,
          grid: {
            display: false,
          },
        },
      },
    },
  };

  const debtChartConfig: { data: ChartData<"line">; options: ChartOptions<"line"> } = {
    data: {
      labels: Array.from(Array(11).keys()).map((i) => ((project.debt || 0) * i * 2) / 10),
      datasets: [
        {
          label: "Current WACC",
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,150,192,1)",
          data: [
            {
              x: project.debt!,
              y: calculateWACC(project.equity, costOfEquity, project.debt, project.costOfDebt, project.tax),
            },
          ],
        },
        {
          label: "WACC",
          borderWidth: 1,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0)",
          pointRadius: 1,
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
      plugins: {
        title: {
          display: true,
          text: "WACC by Debt",
        },
        legend: {
          display: false,
        },
        tooltip: toolTipConfig,
      },
      scales: {
        Debt: {
          axis: "x",
          grid: {
            display: false,
          },
        },
        WACC: {
          axis: "y",
          suggestedMin: 0,
          grid: {
            display: false,
          },
        },
      },
    },
  };

  const costOfEquityChartConfig: { data: ChartData<"line">; options: ChartOptions<"line"> } = {
    data: {
      labels: Array.from(Array(11).keys()).map((i) => {
        return costOfEquity ? +((costOfEquity * i * 2) / 10).toFixed(3) : 0;
      }),
      datasets: [
        {
          label: "Current WACC",
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,150,192,1)",
          data: [
            {
              x: +costOfEquity?.toFixed(3)!,
              y: calculateWACC(project.equity, costOfEquity, project.debt, project.costOfDebt, project.tax),
            },
          ],
        },
        {
          label: "WACC",
          borderWidth: 1,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0)",
          pointRadius: 1,
          pointBackgroundColor: "rgba(75,192,192,1)",
          data: Array.from(Array(11).keys()).map((i) =>
            calculateWACC(
              project.equity,
              ((costOfEquity || 0) * i * 2) / 10,
              project.debt,
              project.costOfDebt,
              project.tax
            )
          ),
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "WACC by Cost of Equity",
        },
        legend: {
          display: false,
        },
        tooltip: toolTipConfig,
      },
      scales: {
        "Cost of Equity": {
          axis: "x",
          grid: {
            display: false,
          },
        },
        WACC: {
          axis: "y",
          suggestedMin: 0,
          grid: {
            display: false,
          },
        },
      },
    },
  };

  const costOfDebtChartConfig: { data: ChartData<"line">; options: ChartOptions<"line"> } = {
    data: {
      labels: Array.from(Array(11).keys()).map((i) => ((project.costOfDebt || 0) * i * 2) / 10),
      datasets: [
        {
          label: "Current WACC",
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,150,192,1)",
          data: [
            {
              x: project.costOfDebt!,
              y: calculateWACC(project.equity, costOfEquity, project.debt, project.costOfDebt, project.tax),
            },
          ],
        },
        {
          label: "WACC",
          borderWidth: 1,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0)",
          pointRadius: 1,
          pointBackgroundColor: "rgba(75,192,192,1)",
          data: Array.from(Array(11).keys()).map((i) =>
            calculateWACC(
              project.equity,
              costOfEquity,
              project.debt,
              ((project.costOfDebt || 0) * i * 2) / 10,
              project.tax
            )
          ),
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "WACC by Cost of Debt",
        },
        legend: {
          display: false,
        },
        tooltip: toolTipConfig,
      },
      scales: {
        "Cost of Debt": {
          axis: "x",
          grid: {
            display: false,
          },
        },
        WACC: {
          axis: "y",
          suggestedMin: 0,
          grid: {
            display: false,
          },
        },
      },
    },
  };

  const taxChartConfig: { data: ChartData<"line">; options: ChartOptions<"line"> } = {
    data: {
      labels: Array.from(Array(11).keys()).map((i) => ((project.tax || 0) * i * 2) / 10),
      datasets: [
        {
          label: "Current WACC",
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,150,192,1)",
          data: [
            {
              x: project.tax!,
              y: calculateWACC(project.equity, costOfEquity, project.debt, project.costOfDebt, project.tax),
            },
          ],
        },
        {
          label: "WACC",
          borderWidth: 1,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0)",
          pointRadius: 1,
          pointBackgroundColor: "rgba(75,192,192,1)",
          data: Array.from(Array(11).keys()).map((i) =>
            calculateWACC(
              project.equity,
              costOfEquity,
              project.debt,
              project.costOfDebt,
              ((project.tax || 0) * i * 2) / 10
            )
          ),
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "WACC by Tax Rate",
        },
        legend: {
          display: false,
        },
        tooltip: toolTipConfig,
      },
      scales: {
        "Tax Rate": {
          axis: "x",
          grid: {
            display: false,
          },
        },
        WACC: {
          axis: "y",
          suggestedMin: 0,
          grid: {
            display: false,
          },
        },
      },
    },
  };
  return (
    <Container>
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
              riskFreeRate={riskFreeRate}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {financingMixChartConfig && (
            <Doughnut data={financingMixChartConfig.data} options={financingMixChartConfig.options} height={240} />
          )}
        </Col>
        <Col sm={4}>
          {equityChartConfig && <Line data={equityChartConfig.data} options={equityChartConfig.options} />}
        </Col>
        <Col sm={4}>{debtChartConfig && <Line {...debtChartConfig} />}</Col>
        <Col sm={4}>{costOfEquityChartConfig && <Line {...costOfEquityChartConfig} />}</Col>
        <Col sm={4}>{costOfDebtChartConfig && <Line {...costOfDebtChartConfig} />}</Col>
        <Col sm={4}>{taxChartConfig && <Line {...taxChartConfig} />}</Col>
      </Row>
    </Container>
  );
};

export default Analysis;
