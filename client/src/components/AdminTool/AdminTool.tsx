import React from "react";
import { Link, Switch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";
import RiskFreeRates from "./RiskFreeRates";
import Betas from "./Betas";
import MarketReturns from "./MarketReturns";
import Nav from "react-bootstrap/Nav";
import { IRiskFreeRate } from "../../models/RiskFreeRate";
import { IBeta } from "../../models/Beta";
import { IMarketReturn } from "../../models/MarketReturn";

interface IProps {
  betas: IBeta[];
  setBetas: any;
  marketReturns: IMarketReturn;
  setMarketReturns: any;
  riskFreeRates: IRiskFreeRate[];
  setRiskFreeRates: any;
}

const AdminTool = ({
  betas,
  setBetas,
  marketReturns,
  setMarketReturns,
  riskFreeRates,
  setRiskFreeRates,
}: IProps) => {
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
        <PrivateRoute
          path="/admin/risk-free-rates"
          component={RiskFreeRates}
          riskFreeRates={riskFreeRates}
          setRiskFreeRates={setRiskFreeRates}
        />
        <PrivateRoute
          path="/admin/betas"
          component={Betas}
          betas={betas}
          setBetas={setBetas}
        />
        <PrivateRoute
          path="/admin/market-returns"
          component={MarketReturns}
          marketReturns={marketReturns}
          setMarketReturns={setMarketReturns}
        />
      </Switch>
    </>
  );
};

export default AdminTool;
