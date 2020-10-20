import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IProject } from "../../models/Project";

const calculateWACC = (
  E: number = 0,
  Re: number = 0,
  D: number = 0,
  Rd: number = 0,
  Tc: number = 0
) => {
  const V = E + D;
  return V ? (E / V) * Re + (D / V) * Rd * (1 - Tc) : 0;
};

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
    <Row className="justify-content-md-center">
      <Card
        bg="dark"
        className="mt-4"
        style={{ width: "32rem", maxWidth: "100%" }}
      >
        <Card.Header>
          <Card.Title className="p-4">Calculate WACC</Card.Title>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEquity">
              <Form.Label column="sm" sm={3}>
                Equity
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="equity"
                  type="number"
                  size="sm"
                  required
                  onChange={handleInputChange}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalRe">
              <Form.Label column="sm" sm={3}>
                Re
              </Form.Label>
              <Col sm={4}>
                <Form.Text>{Re}</Form.Text>
              </Col>
              <Col sm={4}>
                <Form.Text muted>Cost of Equity</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalDebt">
              <Form.Label column="sm" sm={3}>
                Debt
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="debt"
                  type="number"
                  size="sm"
                  required
                  onChange={handleInputChange}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalRd">
              <Form.Label column="sm" sm={3}>
                Rd
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="costOfDebt"
                  type="number"
                  size="sm"
                  required
                  onChange={handleInputChange}
                ></Form.Control>
              </Col>
              <Col sm={4}>
                <Form.Text muted>Cost of Debt</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalRd">
              <Form.Label column="sm" sm={3}>
                Tc
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="tax"
                  type="number"
                  size="sm"
                  required
                  onChange={handleInputChange}
                ></Form.Control>
              </Col>
              <Col sm={4}>
                <Form.Text muted>Corporate Tax Rate</Form.Text>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          WACC <h2>{WACC.toLocaleString()}</h2>
        </Card.Footer>
      </Card>
    </Row>
  );
};

export default WACCCalculator;
