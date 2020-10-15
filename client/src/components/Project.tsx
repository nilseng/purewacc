import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Project = () => {
  return (
    <Card bg="dark" className="p-4" style={{ minHeight: "50vh" }}>
      <Form>
        <Form.Group>
          <Form.Label>Project Name</Form.Label>
          <Form.Control type="text"></Form.Control>
          <Form.Text className="text-muted">
            Enter a name for your new project.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Currency</Form.Label>
          <Form.Control as="select">
            <option>USD</option>
            <option>EUR</option>
            <option>NOK</option>
          </Form.Control>
          <Form.Text className="text-muted">
            The currency will be used to set the risk free rate.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Industry</Form.Label>
          <Form.Control as="select">
            <option>Telecom</option>
            <option>Biotech</option>
            <option>Software</option>
          </Form.Control>
          <Form.Text className="text-muted">
            The industry will be used to set the beta.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Country</Form.Label>
          <Form.Control as="select">
            <option>United States</option>
            <option>China</option>
            <option>United Kingdom</option>
            <option>Germany</option>
          </Form.Control>
          <Form.Text className="text-muted">
            The country will be used to set the risk premium.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Project
        </Button>
        <Form.Text className="text-muted">
          Create the project to get the Weighted Average Cost of Capital (WACC)
          given by the selected values. You will get a report explaining how the
          WACC is calculated.
        </Form.Text>
      </Form>
    </Card>
  );
};

export default Project;
