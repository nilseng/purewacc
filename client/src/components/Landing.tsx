import React from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import AnalysisChart, { ChartTypes } from "./AnalysisChart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const chartConfig = {
  data: {
    labels: ["Equity", "Debt"],
    datasets: [
      {
        label: "Value",
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: ["rgba(75,192,192,0.5)", "rgba(0,150,192,0.5)"],
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
            <Row>
              <Col>
                <AnalysisChart
                  chartType={ChartTypes.Doughnut}
                  config={chartConfig}
                  height={100}
                />
              </Col>
              <Col>
                <AnalysisChart
                  chartType={ChartTypes.Line}
                  config={chartConfig}
                  height={100}
                />
              </Col>
              <Col>
                <AnalysisChart
                  chartType={ChartTypes.Bar}
                  config={chartConfig}
                  height={100}
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
