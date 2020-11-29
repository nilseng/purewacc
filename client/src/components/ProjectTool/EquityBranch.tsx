import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { IBeta } from "../../models/Beta";
import { IMarketReturn } from "../../models/MarketReturn";
import { IBranch } from "../../models/Project";
import { IRiskFreeRate } from "../../models/RiskFreeRate";

interface IProps {
  branch: IBranch;
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRate?: IRiskFreeRate;
  handleInputChange: any;
  deleteBranch: any;
}

const EquityBranch = ({
  branch,
  handleInputChange,
  betas,
  marketReturns,
  riskFreeRate,
  deleteBranch,
}: IProps) => {
  const [beta, setBeta] = useState(
    betas.find((b: IBeta) => b._id === branch.betaId)?.beta
  );

  const [marketReturn, setMarketReturn] = useState(
    marketReturns.find((mr: IMarketReturn) => mr._id === branch.marketId)
      ?.return
  );

  useEffect(() => {
    setBeta(betas.find((b: IBeta) => b._id === branch.betaId)?.beta);
  }, [branch.betaId, betas]);

  useEffect(() => {
    setMarketReturn(
      marketReturns.find((mr: IMarketReturn) => mr._id === branch.marketId)
        ?.return
    );
  }, [branch.marketId, marketReturns]);

  return (
    <Form.Row className="my-2">
      <Col
        sm={12}
        md={6}
        className="rounded px-2"
        style={{ backgroundColor: "#495057" }}
      >
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
              <Form.Label>
                Market Cap{" "}
                {riskFreeRate && (
                  <span className="text-muted">[{riskFreeRate.currency}]</span>
                )}
              </Form.Label>
              <Form.Control
                type="number"
                size="sm"
                name="weight"
                value={
                  !branch.weight && branch.weight !== 0 ? "" : branch.weight
                }
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
                value={branch.betaId || "default"}
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
                The industry is used to set a &beta; for the branch.
              </Form.Text>
            </Form.Group>
          </Col>
          {beta && (
            <Col className="text-right" sm={4} md={4}>
              <Form.Label>&beta;</Form.Label>
              <Form.Text>
                <h3 className="font-italic">{beta}</h3>
              </Form.Text>
            </Col>
          )}
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
                value={branch.marketId || "default"}
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
                The market is used to set an equity risk premium for the branch.
              </Form.Text>
            </Form.Group>
          </Col>
          {marketReturn && (
            <Col className="text-right" sm={4} md={4}>
              <Form.Label>Risk Premium</Form.Label>
              <Form.Text>
                <h3 className="font-italic">
                  {(marketReturn * 100).toFixed(2) + "%"}
                </h3>
              </Form.Text>
            </Col>
          )}
        </Form.Row>
        <Button
          className="float-right mb-2"
          variant="secondary"
          size="sm"
          onClick={() => deleteBranch(branch.id)}
        >
          <FaIcon icon={faTrash} />
        </Button>
      </Col>
    </Form.Row>
  );
};

export default EquityBranch;
