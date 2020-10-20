import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface IProps {
  steps: string[];
  currentStep: number;
}

const ProcessBar = ({ steps, currentStep }: IProps) => {
  return (
    <Row className="pt-4">
      {steps.map((step: string, i: number) => (
        <Col className="p-0" key={i}>
          <div
            className="w-100 d-flex justify-content-center"
            style={{
              borderBottom: "3px solid",
              borderColor: currentStep >= i ? "#17a2b8" : "#868e96",
            }}
          >
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke={currentStep >= i ? "#17a2b8" : "#868e96"}
                strokeWidth="6"
              />
              <text
                x="50%"
                y="50%"
                fontSize="2em"
                textAnchor="middle"
                dy="0.3em"
                stroke={currentStep > i ? "#17a2b8" : "#868e96"}
                fill={currentStep > i ? "#17a2b8" : "#868e96"}
              >
                {i + 1}
              </text>
            </svg>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ProcessBar;
