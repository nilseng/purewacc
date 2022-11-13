import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";
import { Bar, Doughnut } from "react-chartjs-2";
import useWindowDimensions from "../hooks/useWindowDimensions";
import "./Landing.scss";

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
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
        suggestedMin: 0,
      },
    },
  },
};

const Landing = () => {
  const { height } = useWindowDimensions();

  return (
    <>
      <div
        className="landing-heading d-flex align-items-center justify-content-center vh-80 py-4"
        style={{ height: height * 0.6 }}
      >
        <div>
          <span className="display-4">Welcome to Pure WACC</span>
          <span className="h6 font-italic text-primary ml-2">BETA</span>
        </div>
      </div>
      <Container className="d-flex justify-content-center py-4">
        <div>
          <h6 className="mt-4">Features</h6>
          <ul className="mt-2">
            <li className="my-2">Calculate cost of capital for multi industry and multi market projects</li>
            <li className="my-2">High quality betas, equity risk premiums and other data</li>
            <li className="my-2">
              Analytics and insights
              <Row className="my-4">
                <Col md={4}>
                  <Doughnut data={chartConfig.data} options={chartConfig.options} height={80} />
                </Col>
                <Col md={4}>
                  <Bar data={chartConfig.data} options={chartConfig.options} height={80} />
                </Col>
              </Row>
            </li>
          </ul>
          <h6 className="mt-5">Getting Started</h6>
          <ol>
            <li className="my-2">Sign up with username & password or Google login</li>
            <li className="my-2">Create your first project</li>
            <li className="my-2">Analyze the project, add additional projects or browse the application</li>
          </ol>
        </div>
      </Container>
    </>
  );
};

export default Landing;
