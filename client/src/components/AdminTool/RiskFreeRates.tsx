import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IRiskFreeRate } from "../../models/RiskFreeRate";
import { addRiskFreeRate } from "../../services/AdminService";
import { getRiskFreeRates } from "../../services/RfService";

const defaultRfRate: IRiskFreeRate = {
  rate: 0.0,
  currency: "USD",
  source: "",
};

const defaultRfRates: IRiskFreeRate[] = [];

const RiskFreeRates = () => {
  const [showEditRate, setShowEditRate] = useState(false);
  const [riskFreeRates, setRfRates] = useState(defaultRfRates);
  const [riskFreeRate, setRiskFreeRate] = useState(defaultRfRate);

  const addRfRate = async () => {
    const res = await addRiskFreeRate(riskFreeRate);
    setRfRates([...riskFreeRates, res]);
    setShowEditRate(false);
    setRiskFreeRate(defaultRfRate);
  };

  const handleInputChange = (event: any) => {
    setRiskFreeRate({
      ...riskFreeRate,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getRiskFreeRates().then((rfRates) => setRfRates(rfRates));
  }, []);

  return (
    <Row>
      <Col className="p-4">
        <h5>Risk Free Rates</h5>
        <Button
          variant="primary"
          className="m-1"
          size="sm"
          onClick={() => setShowEditRate(!showEditRate)}
        >
          Add Risk Free Rate
        </Button>
        {showEditRate && (
          <Form className="form-inline bg-dark rounded p-1 m-1">
            <Form.Label className="m-1">Risk Free Rate</Form.Label>
            <Form.Control
              className="m-1"
              name="rate"
              value={riskFreeRate.rate}
              type="number"
              size="sm"
              placeholder="E.g. 0.0210"
              onChange={handleInputChange}
            ></Form.Control>
            <Form.Label className="m-1">Currency</Form.Label>
            <Form.Control
              className="m-1"
              name="currency"
              value={riskFreeRate.currency}
              type="text"
              size="sm"
              onChange={handleInputChange}
            ></Form.Control>
            <Form.Label className="m-1">Source</Form.Label>
            <Form.Control
              className="m-1"
              name="source"
              value={riskFreeRate.source}
              type="text"
              size="sm"
              onChange={handleInputChange}
            ></Form.Control>
            <Button variant="primary" size="sm" onClick={addRfRate}>
              Save
            </Button>
          </Form>
        )}
        {riskFreeRates &&
          riskFreeRates.map((rf: IRiskFreeRate) => (
            <div key={rf._id}>{JSON.stringify(rf)}</div>
          ))}
      </Col>
    </Row>
  );
};

export default RiskFreeRates;
