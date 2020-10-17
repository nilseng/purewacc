import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import AdminModal from "./AdminModal";

import { addRiskFreeRate, getRiskFreeRates } from "../utils/AdminService";

const AdminTool = () => {
  const [riskFreeRates, setRfRates] = useState();

  const [showModal, setShowModal] = useState(false);

  const addRfRate = async () => {
    setShowModal(true);
    /* const res = await addRiskFreeRate({
      rate: 0.01,
      currency: "NOK",
      source: "Damodaran",
    }); */
  };
  const addBeta = () => {
    console.log("add beta");
  };

  const addRm = () => {
    console.log("add Rm");
  };

  useEffect(() => {
    const riskFreeRates = getRiskFreeRates().then((res) => console.log(res));
  }, [riskFreeRates]);

  return (
    <>
      <div>
        <Button
          className="m-2"
          variant="secondary"
          size="sm"
          onClick={addRfRate}
        >
          Add Risk Free Rate
        </Button>
        <AdminModal show={showModal} setShow={setShowModal} />
        <Button className="m-2" variant="secondary" size="sm" onClick={addBeta}>
          Add Beta
        </Button>
        <Button className="m-2" variant="secondary" size="sm" onClick={addRm}>
          Add Market Premium
        </Button>
      </div>
      <Row>
        <Col>
          <h5>Risk Free Rates</h5>
          <ul>
            <li>Rf: 0.02, Currency: USD</li>
          </ul>
        </Col>
        <Col>
          <h5>Betas</h5>
          <ul>
            <li>beta: 0.9, Industry: Pharma</li>
          </ul>
        </Col>
        <Col>
          <h5>Market Premiums</h5>
          <ul>
            <li>Rm: 0.07, Market: S&P</li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default AdminTool;
