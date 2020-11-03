import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IMarketReturn } from "../../models/MarketReturn";
import {
  addMarketReturn,
  getMarketReturns,
} from "../../services/MarketReturnService";

const defaultMarketReturn: IMarketReturn = {
  return: 1.2,
  market: "global",
  source: "",
};

const defaultMarketReturns: IMarketReturn[] = [];

const MarketReturns = () => {
  const [showEditMr, setShowEditMr] = useState(false);
  const [mrs, setMrs] = useState(defaultMarketReturns);
  const [mr, setMr] = useState(defaultMarketReturn);

  const handleAddMr = async () => {
    const res = await addMarketReturn(mr);
    setMrs([...mrs, res]);
    setShowEditMr(false);
    setMr(defaultMarketReturn);
  };

  const handleInputChange = (event: any) => {
    setMr({
      ...mr,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getMarketReturns().then((mrs) => setMrs(mrs));
  }, []);

  return (
    <Row>
      <Col className="p-4">
        <h5>Market Returns</h5>
        <Button
          variant="primary"
          className="m-1"
          size="sm"
          onClick={() => setShowEditMr(!showEditMr)}
        >
          Add Market Return
        </Button>
        {showEditMr && (
          <Form className="form-inline bg-dark rounded p-1 m-1">
            <Form.Label className="m-1">Market Return</Form.Label>
            <Form.Control
              className="m-1"
              name="beta"
              value={mr.return}
              type="number"
              size="sm"
              placeholder="E.g. 1.1"
              onChange={handleInputChange}
            ></Form.Control>
            <Form.Label className="m-1">Market</Form.Label>
            <Form.Control
              className="m-1"
              name="market"
              value={mr.market}
              type="text"
              size="sm"
              onChange={handleInputChange}
            ></Form.Control>
            <Form.Label className="m-1">Source</Form.Label>
            <Form.Control
              className="m-1"
              name="source"
              value={mr.source}
              type="text"
              size="sm"
              onChange={handleInputChange}
            ></Form.Control>
            <Button variant="primary" size="sm" onClick={handleAddMr}>
              Save
            </Button>
          </Form>
        )}
        {mrs &&
          mrs.map((mr: IMarketReturn) => (
            <div key={mr._id}>{JSON.stringify(mr)}</div>
          ))}
      </Col>
    </Row>
  );
};

export default MarketReturns;
