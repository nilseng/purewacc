import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface WACCInput {
  E: number;
  Re: number;
  D: number;
  Rd: number;
  Tc: number;
}

const calculateWACC = (input: WACCInput = defaultInput) => {
  const V = input.E + input.D;
  return (input.E / V) * input.Re + (input.D / V) * input.Rd * (1 - input.Tc);
};

const defaultInput = {
  E: 25000,
  Re: 0.14,
  D: 18000,
  Rd: 0.07,
  Tc: 0.2,
};

const WACCCalculator = () => {
  const [WACC, setWACC] = useState(calculateWACC());
  // eslint-disable-next-line
  const [input, setInput] = useState(defaultInput);
  const handleChange = (val: any) => {
    setInput((prevInput: WACCInput) => {
      const input = { ...prevInput, ...val };
      setWACC(calculateWACC(input));
      return input;
    });
  };
  return (
    <Row className="justify-content-md-center">
      <Card
        bg="dark"
        className="mt-4"
        style={{ width: "32rem", maxWidth: "100%" }}
      >
        <Card.Header>
          <Card.Title className="p-4">WACC Calculator</Card.Title>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEquity">
              <Form.Label column="sm" sm={3}>
                Equity
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  size="sm"
                  placeholder={"" + defaultInput.E.toLocaleString()}
                  required
                  onChange={(e: any) =>
                    handleChange(
                      e.target.value
                        ? { E: +e.target.value }
                        : { E: defaultInput.E }
                    )
                  }
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalRe">
              <Form.Label column="sm" sm={3}>
                Re
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  size="sm"
                  placeholder={"" + defaultInput.Re}
                  required
                  onChange={(e: any) =>
                    handleChange(
                      e.target.value
                        ? { Re: +e.target.value }
                        : { Re: defaultInput.Re }
                    )
                  }
                ></Form.Control>
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
                  size="sm"
                  placeholder={"" + defaultInput.D.toLocaleString()}
                  required
                  onChange={(e: any) =>
                    handleChange(
                      e.target.value
                        ? { D: +e.target.value }
                        : { D: defaultInput.D }
                    )
                  }
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalRd">
              <Form.Label column="sm" sm={3}>
                Rd
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  size="sm"
                  placeholder={"" + defaultInput.Rd}
                  required
                  onChange={(e: any) =>
                    handleChange(
                      e.target.value
                        ? { Rd: +e.target.value }
                        : { Rd: defaultInput.Rd }
                    )
                  }
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
                  size="sm"
                  placeholder={"" + defaultInput.Tc}
                  required
                  onChange={(e: any) =>
                    handleChange(
                      e.target.value
                        ? { Tc: +e.target.value }
                        : { Tc: defaultInput.Tc }
                    )
                  }
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
