import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IProject } from "../../models/Project";

interface IProps {
  project: IProject;
  setProject: any;
  handleInputChange: any;
}

const AddBranches = ({ project, setProject, handleInputChange }: IProps) => {
  const addBranch = () => {
    setProject({
      ...project,
      branches: [
        ...project.branches,
        {
          id: project.branches.length + 1,
          name: "",
          weight: 0,
          industry: "all",
          region: "global",
        },
      ],
    });
  };

  return (
    <>
      <h5 className="my-4">Branches</h5>
      {project.branches.map((branch) => (
        <Form.Row className="border-left border-light my-2" key={branch.id}>
          <svg
            className="ml-n2 mt-n1"
            width="15"
            height="15"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="#f8f9fa"
              fill="#f8f9fa"
              strokeWidth="1"
            />
          </svg>
          <Col sm={12} md={6} className=" bg-dark rounded ml-4 px-2">
            <Form.Row>
              <Col md={6} className="pt-2">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    name="name"
                    placeholder="Enter a descriptive branch name"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={3} className="pt-2">
                <Form.Group>
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="weight"
                    title="Size should ideally be measured by Market Capitalization. Revenue or other figures can be used as a proxy for Market Cap."
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="d-flex justify-content-center">
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control as="select" size="sm">
                    <option>Telecom</option>
                    <option>Biotech</option>
                    <option>Software</option>
                  </Form.Control>
                  <Form.Text className="text-muted">
                    The industry will be used to set the beta.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" size="sm">
                    <option>United States</option>
                    <option>China</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                  </Form.Control>
                  <Form.Text className="text-muted">
                    The country will be used to set the risk premium.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
      ))}
      <div className="mt-2 ml-5 mb-4">
        <Button variant="link" size="sm" onClick={addBranch}>
          <FaIcon className="mr-2" icon={faPlus} />
          Add Branch
        </Button>
      </div>
    </>
  );
};

export default AddBranches;
