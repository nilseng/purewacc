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
          ></div>
        </Col>
      ))}
    </Row>
  );
};

export default ProcessBar;
