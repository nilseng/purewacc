import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { IProject } from "../../models/Project";
import { IRiskFreeRate } from "../../models/RiskFreeRate";
import ProjectName from "./ProjectName";
import SetRiskFreeRate from "./SetRiskFreeRate";

interface IProps {
  project: IProject;
  handleInputChange: any;
  rfRates: IRiskFreeRate[];
}

const InitProject = ({ project, handleInputChange, rfRates }: IProps) => {
  return (
    <>
      <h5 className="my-4">Project Setup</h5>
      <Form.Row className="mt-4">
        <Col sm={8} md={6}>
          <ProjectName
            project={project}
            handleInputChange={handleInputChange}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4} md={2}>
          <SetRiskFreeRate
            project={project}
            handleInputChange={handleInputChange}
            rfRates={rfRates}
          />
        </Col>
        <Col className="text-right" sm={4} md={4}>
          <Form.Label>Risk Free Rate</Form.Label>
          <Form.Text>
            <h3>
              {
                rfRates.find((rf: IRiskFreeRate) => rf._id === project.rfId)
                  ?.rate
              }
            </h3>
          </Form.Text>
        </Col>
      </Form.Row>
    </>
  );
};

export default InitProject;
