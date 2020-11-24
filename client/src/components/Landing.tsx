import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AnalysisChart, { ChartTypes } from "./AnalysisChart";

const chartConfig = {
  data: {
    labels: ["Equity", "Debt"],
    datasets: [
      {
        label: "Value",
        pointRadius: 0,
        borderColor: ["rgba(75,192,192,1)", "rgba(0,150,192,1)"],
        borderWidth: 1,
        backgroundColor: ["rgba(75,192,192,0.2)", "rgba(0,150,192,0.2)"],
        data: [27635, 12456],
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const Landing = () => {
  return (
    <div className="py-4">
      <Jumbotron className="bg-dark">
        <span className="h4">Welcome to Pure WACC</span>
        <span className="h6 font-italic text-primary ml-2">BETA</span>
        <h6 className="mt-4">Features</h6>
        <ul className="mt-2">
          <li>
            Calculate cost of capital for multi industry and multi market
            projects
          </li>
          <li>High quality betas, equity risk premiums and other data</li>
          <li>
            Analytics and insights
            <Row className="my-4">
              <Col md={4}>
                <AnalysisChart
                  chartType={ChartTypes.Doughnut}
                  config={chartConfig}
                  height={80}
                />
              </Col>
              <Col md={4}>
                <AnalysisChart
                  chartType={ChartTypes.Bar}
                  config={chartConfig}
                  height={80}
                />
              </Col>
            </Row>
          </li>
          <li>Secure login with auth0</li>
        </ul>
      </Jumbotron>
    </div>
  );
};

export default Landing;
