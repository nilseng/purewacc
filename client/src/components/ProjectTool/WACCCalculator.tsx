import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IProject } from "../../models/Project";
import { calculateWACC } from "../../services/CalculationService";

interface IProps {
  project: IProject;
  Re: number;
  handleInputChange: any;
}

const WACCCalculator = ({ project, Re, handleInputChange }: IProps) => {
  const [WACC, setWACC] = useState(0);

  useEffect(() => {
    setWACC(
      calculateWACC(
        project.equity,
        Re,
        project.debt,
        project.costOfDebt,
        project.tax
      )
    );
  }, [project, Re]);

  return (
    <>
      <h5 className="my-4">Calculate WACC</h5>
      <Form.Row>
        <Col sm={4} md={2}>
          <Form.Group>
            <Form.Label>Equity</Form.Label>
            <Form.Control
              name="equity"
              type="number"
              value={
                !project.equity && project.equity !== 0 ? "" : project.equity
              }
              size="sm"
              required
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4} md={2}></Col>
        <Col sm={4} md={2}>
          <Form.Group className="text-right text-muted">
            <Form.Label>Cost of Equity</Form.Label>
            <h2>{Re.toFixed(3)}</h2>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4} md={2}>
          <Form.Group>
            <Form.Label>Debt</Form.Label>
            <Form.Control
              name="debt"
              type="number"
              value={!project.debt && project.debt !== 0 ? "" : project.debt}
              size="sm"
              required
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4} md={2}></Col>
        <Col sm={4} md={2}>
          <Form.Group className="text-right text-muted">
            <Form.Label>Cost of Debt</Form.Label>
            <Form.Control
              name="costOfDebt"
              type="number"
              value={
                !project.costOfDebt && project.costOfDebt !== 0
                  ? ""
                  : project.costOfDebt
              }
              size="sm"
              required
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4} md={2}>
          <Form.Group>
            <Form.Label>Tax Rate</Form.Label>
            <Form.Control
              name="tax"
              type="number"
              value={!project.tax && project.tax !== 0 ? "" : project.tax}
              size="sm"
              required
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Row className="text-right">
        <Col sm={12} md={6} className="border-top border-dark py-4">
          WACC{" "}
          <h2>
            {!isNaN(WACC)
              ? WACC.toFixed(3).toLocaleString()
              : (0).toFixed(3).toLocaleString()}
          </h2>
        </Col>
      </Row>
    </>
  );
};

export default WACCCalculator;
