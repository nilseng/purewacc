import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IBranch, IProject } from "../../models/Project";
import { IBeta } from "../../models/Beta";
import { IMarketReturn } from "../../models/MarketReturn";
import Row from "react-bootstrap/Row";

interface IProps {
  project: IProject;
  setProject: any;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  costOfEquity?: number;
}

const AddBranches = ({
  project,
  setProject,
  betas,
  marketReturns,
  costOfEquity,
}: IProps) => {
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

  const handleInputChange = (event: any, branch: IBranch) => {
    const updatedBranch = {
      ...branch,
      [event.target.name]:
        event.target.type === "number"
          ? +event.target.value
          : event.target.value,
    };
    setProject({
      ...project,
      branches: project.branches.map((b: IBranch) =>
        b.id === branch.id ? updatedBranch : b
      ),
    });
  };

  return (
    <>
      <h5 className="my-4">Calculate Cost of Equity</h5>
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
              <Col md={8} className="pt-2">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    name="name"
                    value={branch.name}
                    placeholder="Branch name"
                    onChange={(e) => handleInputChange(e, branch)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4} className="pt-2">
                <Form.Group>
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="weight"
                    value={branch.weight}
                    title="Size should ideally be measured by Market Capitalization. Revenue or other figures can be used as a proxy for Market Cap."
                    required
                    onChange={(e) => handleInputChange(e, branch)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col sm={12} md={8}>
                <Form.Group>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    size="sm"
                    name="betaId"
                    value={branch.betaId}
                    defaultValue="default"
                    required
                    onChange={(e) => handleInputChange(e, branch)}
                  >
                    <option disabled value="default">
                      Select
                    </option>
                    {betas.map((beta: IBeta) => (
                      <option key={beta._id} value={beta._id}>
                        {beta.industry}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    The industry will be used to set the beta.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col className="text-right" sm={4} md={4}>
                <Form.Label>Beta</Form.Label>
                <Form.Text>
                  <h3 className="font-italic">
                    {betas.find((b: IBeta) => b._id === branch.betaId)?.beta}
                  </h3>
                </Form.Text>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col sm={12} md={8}>
                <Form.Group>
                  <Form.Label>Market</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    size="sm"
                    name="marketId"
                    value={branch.marketId}
                    defaultValue="default"
                    required
                    onChange={(e) => handleInputChange(e, branch)}
                  >
                    <option disabled value="default">
                      Select
                    </option>
                    {marketReturns.map((mr: IMarketReturn) => (
                      <option key={mr._id} value={mr._id}>
                        {mr.market}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    The market return will be used in to calculate cost of
                    capital.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col className="text-right" sm={4} md={4}>
                <Form.Label>Market Return</Form.Label>
                <Form.Text>
                  <h3 className="font-italic">
                    {
                      marketReturns.find(
                        (mr: IMarketReturn) => mr._id === branch.marketId
                      )?.return
                    }
                  </h3>
                </Form.Text>
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
      <Row className="text-right">
        <Col sm={12} md={6} className="border-top border-dark py-4">
          Cost of Equity{" "}
          <h2>
            {costOfEquity
              ? costOfEquity.toFixed(3).toLocaleString()
              : (0).toFixed(3).toLocaleString()}
          </h2>
        </Col>
      </Row>
    </>
  );
};

export default AddBranches;
