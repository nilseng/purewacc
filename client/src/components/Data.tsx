import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IRiskFreeRate } from "../models/RiskFreeRate";
import Container from "react-bootstrap/Container";

interface IProps {
  betas: IBeta[];
  marketReturns: IMarketReturn[];
  riskFreeRates: IRiskFreeRate[];
}

const Data = ({ betas, marketReturns, riskFreeRates }: IProps) => {
  const [key, setKey] = useState("betas");

  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k: string) => setKey(k)}
      >
        <Tab eventKey="betas" title="Betas">
          <p className="text-muted small mt-2">
            1) Currently all betas are taken from{" "}
            <a
              href="http://pages.stern.nyu.edu/~adamodar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aswath Damodaran
            </a>
            . A million thanks for making valuable data publicly available.{" "}
            <FaIcon icon={faHeart} />
          </p>
          <p className="text-muted small">
            2) All betas are unlevered betas corrected for cash.
          </p>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Industry</th>
                <th>&beta;</th>
                <th>Last Updated</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {betas &&
                betas.map((beta) => (
                  <tr key={beta._id}>
                    <td>{beta.industry}</td>
                    <td>{beta.beta}</td>
                    <td>
                      {beta.createdAt &&
                        new Date(beta.createdAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                    </td>
                    <td>
                      <a href={beta.source}>{beta.source}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="marketReturns" title="Market Premiums">
          <p className="text-muted small mt-2">
            1) Currently all equity risk premiums are taken from{" "}
            <a
              href="http://pages.stern.nyu.edu/~adamodar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aswath Damodaran
            </a>
            . A million thanks for making valuable data publicly available.{" "}
            <FaIcon icon={faHeart} />
          </p>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Market</th>
                <th>ERP</th>
                <th>Last Updated</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {marketReturns &&
                marketReturns.map((mr) => (
                  <tr key={mr._id}>
                    <td>{mr.market}</td>
                    <td>{mr.return}</td>
                    <td>
                      {mr.createdAt &&
                        new Date(mr.createdAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                    </td>
                    <td>
                      <a href={mr.source}>{mr.source}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="riskFreeRates" title="Risk Free Rates">
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Currency</th>
                <th>
                  R<small>f</small>
                </th>
                <th>Last Updated</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {riskFreeRates &&
                riskFreeRates.map((rf) => (
                  <tr key={rf._id}>
                    <td>{rf.currency}</td>
                    <td>{rf.rate}</td>
                    <td>
                      {rf.createdAt &&
                        new Date(rf.createdAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                    </td>
                    <td>
                      <a href={rf.source}>{rf.source}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Data;
