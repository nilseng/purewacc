import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

interface IProject {
  name: string;
  currency: string;
  branches: IBranch[];
}

interface IBranch {
  id: number;
  name: string;
  weight: number;
  industry: string;
  region: string;
}

const defaultProject: IProject = {
  name: "",
  currency: "USD",
  branches: [{ id: 1, name: "", weight: 1, industry: "all", region: "global" }],
};

const Project = () => {
  const [project, setProject] = useState(defaultProject);

  useEffect(() => {
    console.log(project);
  }, [project]);

  const handleInputChange = (event: any) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  const addBranch = () => {
    console.log("add branch");
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
    <Form className="p-4">
      <Form.Row className="d-flex justify-content-center">
        <Col sm={12} md={6}>
          <Form.Row>
            <Col sm={8} md={8}>
              <Form.Group>
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  size="sm"
                  value={project.name}
                  onChange={handleInputChange}
                ></Form.Control>
                <Form.Text className="text-muted">
                  Enter a name for your new project.
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={4} md={4}>
              <Form.Group>
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  name="currency"
                  as="select"
                  size="sm"
                  value={project.currency}
                  onChange={handleInputChange}
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>NOK</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  The currency will be used to set the risk free rate.
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>
      <Form.Row className="d-flex justify-content-center">
        <Col sm={12} md={6}>
          <h5>Branches</h5>
        </Col>
      </Form.Row>
      {project.branches.map((branch) => (
        <Form.Row className="d-flex justify-content-center my-2">
          <Col sm={12} md={6} className="bg-dark rounded">
            <Form.Row>
              <Col md={8} className="bg-dark pt-3 px-2 mt-2">
                <Form.Group>
                  <Form.Control
                    type="text"
                    size="sm"
                    name="name"
                    placeholder="Enter branch name"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row
              key={branch.id}
              className="d-flex justify-content-center p-2 mb-2"
            >
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
      <Form.Row className="d-flex justify-content-center">
        <Col sm={12} md={6}>
          <div className="mt-2 mb-4">
            <Button variant="secondary" size="sm" onClick={addBranch}>
              Add Branch
            </Button>
          </div>
          <Button variant="primary" type="submit" size="sm">
            Create Project
          </Button>
          <Form.Text className="text-muted">
            Create the project to get the Weighted Average Cost of Capital
            (WACC) given by the selected values. You will get a report
            explaining how the WACC is calculated.
          </Form.Text>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default Project;
