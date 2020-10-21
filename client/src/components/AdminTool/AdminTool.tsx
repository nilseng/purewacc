import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";
import RiskFreeRates from "./RiskFreeRates";
import Betas from "./Betas";
import MarketReturns from "./MarketReturns";
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
        <Link to="/admin/market-returns" className="btn btn-sm btn-primary m-2">
          Market Returns
        </Link>
      </Nav>
      <Switch>
        <PrivateRoute path="/admin/risk-free-rates" component={RiskFreeRates} />
        <PrivateRoute path="/admin/betas" component={Betas} />
        <PrivateRoute path="/admin/market-returns" component={MarketReturns} />
      </Switch>
    </>
  );
};

export default AdminTool;
