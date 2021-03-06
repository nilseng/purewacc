import React from "react";
import Form from "react-bootstrap/Form";
import { IProject } from "../../models/Project";

const ProjectName = (props: { project: IProject; handleInputChange: any }) => {
  return (
    <Form.Group>
      <Form.Label>Project Name</Form.Label>
      <Form.Control
        name="name"
        type="text"
        size="sm"
        value={props.project.name}
        onChange={props.handleInputChange}
      ></Form.Control>
    </Form.Group>
  );
};

export default ProjectName;
