import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ProcessBar = () => {
  return (
    <Row>
      <Col className="p-0">
        <div
          className="w-100 d-flex justify-content-center"
          style={{ borderBottom: "3px solid #17a2b8" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#17a2b8" strokeWidth="6" />
            <text
              x="50%"
              y="50%"
              fontSize="2em"
              textAnchor="middle"
              dy="0.3em"
              stroke="#faf8f9"
              fill="#faf8f9"
            >
              1
            </text>
          </svg>
        </div>
      </Col>
      <Col className="p-0">
        <div
          className="w-100 d-flex justify-content-center"
          style={{ borderBottom: "3px solid #17a2b8" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#17a2b8" strokeWidth="6" />
          </svg>
        </div>
      </Col>
      <Col className="p-0">
        <div
          className="w-100 d-flex justify-content-center"
          style={{ borderBottom: "3px solid #17a2b8" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#17a2b8" strokeWidth="6" />
          </svg>
        </div>
      </Col>
      <Col className="p-0">
        <div
          className="w-100 d-flex justify-content-center"
          style={{ borderBottom: "3px solid #17a2b8" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#17a2b8" strokeWidth="6" />
          </svg>
        </div>
      </Col>
    </Row>
  );
};

export default ProcessBar;
