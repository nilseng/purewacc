import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { IProject } from "../../models/Project";
import { IRiskFreeRate } from "../../models/RiskFreeRate";
import ProjectName from "./ProjectName";
import RiskFreeRate from "./RiskFreeRate";

interface IProps {
  project: IProject;
  handleInputChange: any;
  rfRates: IRiskFreeRate[];
}

const InitProject = ({ project, handleInputChange, rfRates }: IProps) => {
  const [riskFreeRate, setRiskFreeRate] = useState<number>();

  useEffect(() => {
    if (rfRates && project.rfId)
      setRiskFreeRate(
        rfRates.find((rf: IRiskFreeRate) => rf._id === project.rfId)?.rate
      );
  }, [project.rfId, rfRates]);

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
          <RiskFreeRate
            project={project}
            handleInputChange={handleInputChange}
            rfRates={rfRates}
          />
        </Col>
        {riskFreeRate && (
          <Col className="text-right" sm={4} md={4}>
            <Form.Label>Risk Free Rate</Form.Label>
            <Form.Text>
              <h3>{(riskFreeRate * 100).toFixed(2) + "%"}</h3>
            </Form.Text>
          </Col>
        )}
      </Form.Row>
    </>
  );
};

export default InitProject;
