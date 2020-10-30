import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IBeta } from "../../models/Beta";
import { addBeta, getBetas } from "../../services/AdminService";

const defaultBeta: IBeta = {
  beta: 1.1,
  industry: "all",
  source: "",
};

const defaultBetas: IBeta[] = [];

const Betas = () => {
  const [showEditBeta, setShowEditBeta] = useState(false);
  const [betas, setBetas] = useState(defaultBetas);
  const [beta, setBeta] = useState(defaultBeta);

  const handleAddBeta = async () => {
    const res = await addBeta(beta);
    setBetas([...betas, res]);
    setShowEditBeta(false);
    setBeta(defaultBeta);
  };

  const handleInputChange = (event: any) => {
    setBeta({
      ...beta,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getBetas().then((betas) => setBetas(betas));
  }, []);

  return (
    <Row>
      <Col className="p-4">
        <h5>Betas</h5>
        <Button
          variant="primary"
          className="m-1"
          size="sm"
          onClick={() => setShowEditBeta(!showEditBeta)}
        >
          Add Beta
        </Button>
        {showEditBeta && (
          <Form className="form-inline bg-dark rounded p-1 m-1">
            <Form.Label className="m-1">Beta</Form.Label>
            <Form.Control
              className="m-1"
              name="beta"
              value={beta.beta}
              type="number"
              size="sm"
              placeholder="E.g. 1.1"
              onChange={handleInputChange}
            ></Form.Control>
            <Form.Label className="m-1">Industry</Form.Label>
            <Form.Control
              className="m-1"
              name="industry"
              value={beta.industry}
              type="text"
              size="sm"
              onChange={handleInputChange}
            ></Form.Control>
            <Form.Label className="m-1">Source</Form.Label>
            <Form.Control
              className="m-1"
              name="source"
              value={beta.source}
              type="text"
              size="sm"
              onChange={handleInputChange}
            ></Form.Control>
            <Button variant="primary" size="sm" onClick={handleAddBeta}>
              Save
            </Button>
          </Form>
        )}
        {betas &&
          betas.map((beta: IBeta) => (
            <div key={beta._id}>{JSON.stringify(beta)}</div>
          ))}
      </Col>
    </Row>
  );
};

export default Betas;
