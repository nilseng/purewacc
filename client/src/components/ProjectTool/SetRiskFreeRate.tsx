import React from "react";
import Form from "react-bootstrap/Form";
import { IProject } from "../../models/Project";
import { IRiskFreeRate } from "../../models/RiskFreeRate";

interface IProps {
  project: IProject;
  handleInputChange: any;
  rfRates: IRiskFreeRate[];
}

const SetRiskFreeRate = ({ project, handleInputChange, rfRates }: IProps) => {
  return (
    <Form.Group>
      <Form.Label>Currency</Form.Label>
      <Form.Control
        name="rfId"
        as="select"
        size="sm"
        value={project.rfId}
        defaultValue="default"
        onChange={handleInputChange}
      >
        <option disabled value="default">
          Select
        </option>
        {rfRates.map((rf: IRiskFreeRate) => (
          <option key={rf._id} value={rf._id}>
            {rf.currency}
          </option>
        ))}
      </Form.Control>
      <Form.Text className="text-muted">
        The currency will be used to set the risk free rate.
      </Form.Text>
    </Form.Group>
  );
};

export default SetRiskFreeRate;
