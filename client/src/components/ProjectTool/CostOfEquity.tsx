import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import { IBranch, IProject } from "../../models/Project";
import { IBeta } from "../../models/Beta";
import { IMarketReturn } from "../../models/MarketReturn";
import Row from "react-bootstrap/Row";
import EquityBranch from "./EquityBranch";
import { IRiskFreeRate } from "../../models/RiskFreeRate";

interface IProps {
  project: IProject;
  setProject: any;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRate?: IRiskFreeRate;
  costOfEquity?: number;
}

const CostOfEquity = ({
  project,
  setProject,
  betas,
  marketReturns,
  riskFreeRate,
  costOfEquity,
}: IProps) => {
  const addBranch = () => {
    setProject({
      ...project,
      branches: [
        ...project.branches,
        {
          id: uuidv4(),
          name: "",
          weight: "",
          industry: "",
          region: "",
        },
      ],
    });
  };

  const deleteBranch = (id: string) => {
    setProject({
      ...project,
      branches: project.branches.filter((b) => b.id !== id),
    });
  };

  const handleInputChange = (event: any, branch: IBranch) => {
    const updatedBranch = {
      ...branch,
      [event.target.name]:
        event.target.type === "number" && event.target.value
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
      <p className="small text-muted">
        Add a branch for each combination of industry and market. Each branch
        has a &beta; defined by its industry and a risk premium defined by its
        market. The cost of equity for the project is a weighted average of the
        cost of equity for each branch.
      </p>
      {project.branches.map((branch) => (
        <EquityBranch
          key={branch.id}
          branch={branch}
          betas={betas}
          marketReturns={marketReturns}
          riskFreeRate={riskFreeRate}
          handleInputChange={handleInputChange}
          deleteBranch={deleteBranch}
        />
      ))}
      <div className="mt-2 ml-5 mb-4">
        <Button variant="link" size="sm" onClick={addBranch}>
          <FaIcon className="mr-2" icon={faPlus} />
          Add Branch
        </Button>
      </div>
      <Row className="d-flex flex-row-reverse">
        <Col sm={12} md={3} className="border-top border-dark py-4">
          Cost of Equity{" "}
          {costOfEquity && <h2>{(costOfEquity * 100).toFixed(2) + "%"}</h2>}
          {(!costOfEquity || isNaN(costOfEquity)) && (
            <p className="small text-muted">
              Select a currency and complete all fields for each branch to get
              the cost of equity.
            </p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CostOfEquity;
