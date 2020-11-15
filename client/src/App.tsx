import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Switch, Route, Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import history from "./utils/history";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import WACCCalculator from "./components/ProjectTool/WACCCalculator";
import AdminTool from "./components/AdminTool/AdminTool";
import ProjectTool from "./components/ProjectTool/ProjectTool";
import ProjectList from "./components/ProjectList";
import About from "./components/About";
import { getRiskFreeRates } from "./services/RiskFreeRatefService";
import { getBetas } from "./services/BetaService";
import { getMarketReturns } from "./services/MarketReturnService";

function App() {
  const { loginWithRedirect } = useAuth0();

  const [betas, setBetas] = useState();
  const [marketReturns, setMarketReturns] = useState();
  const [riskFreeRates, setRiskFreeRates] = useState();

  useEffect(() => {
    getBetas().then((betas) => setBetas(betas));
    getMarketReturns().then((mrs) => setMarketReturns(mrs));
    getRiskFreeRates().then((rfRates) => setRiskFreeRates(rfRates));
  }, []);

  return (
    <Router history={history}>
      <NavBar />
      <Container style={{ minHeight: "calc(100vh - 260px)" }}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/project-tool" component={ProjectTool} />
          <PrivateRoute
            path="/projects"
            component={ProjectList}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
          />
          <PrivateRoute path="/calculator" component={WACCCalculator} />
          <PrivateRoute
            path="/admin"
            component={AdminTool}
            betas={betas}
            setBetas={setBetas}
            marketReturns={marketReturns}
            setMarketReturns={setMarketReturns}
            riskFreeRates={riskFreeRates}
            setRiskFreeRates={setRiskFreeRates}
          />
          <Route path="/about" component={About} />
          <Route path="/login" render={() => loginWithRedirect()} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
