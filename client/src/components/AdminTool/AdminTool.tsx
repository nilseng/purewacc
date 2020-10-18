import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import RiskFreeRates from "./RiskFreeRates";
import Betas from "./Betas";
import EquityRiskPremium from "./EquityRiskPremium";
import Nav from "react-bootstrap/Nav";

const AdminTool = () => {
  return (
    <>
      <Nav>
        <Link
          to="/admin/risk-free-rates"
          className="btn btn-sm btn-primary m-2"
        >
          Risk Free Rates
        </Link>
        <Link to="/admin/betas" className="btn btn-sm btn-primary m-2">
          Betas
        </Link>
        <Link
          to="/admin/equity-risk-premiums"
          className="btn btn-sm btn-primary m-2"
        >
          Equity Risk Premiums
        </Link>
      </Nav>
      <Switch>
        <Route path="/admin/risk-free-rates" component={RiskFreeRates} />
        <Route path="/admin/betas" component={Betas} />
        <Route
          path="/admin/equity-risk-premiums"
          component={EquityRiskPremium}
        />
      </Switch>
    </>
  );
};

export default AdminTool;
