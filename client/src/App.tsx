import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Switch, Route, Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";

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
import Analysis from "./components/Analysis";
import { IProject } from "./models/Project";

const defaultProject: IProject = {
  name: "",
  branches: [{ id: uuidv4(), name: "", weight: "", industry: "", region: "" }],
};

function App() {
  const { loginWithRedirect } = useAuth0();

  const [project, setProject] = useState(defaultProject);
  const [betas, setBetas] = useState();
  const [marketReturns, setMarketReturns] = useState();
  const [riskFreeRates, setRiskFreeRates] = useState();

  const resetProject = () => {
    setProject(defaultProject);
  };

  useEffect(() => {
    getBetas().then((betas) => setBetas(betas));
    getMarketReturns().then((mrs) => setMarketReturns(mrs));
    getRiskFreeRates().then((rfRates) => setRiskFreeRates(rfRates));
  }, []);

  return (
    <Router history={history}>
      <NavBar resetProject={resetProject} />
      <Container style={{ minHeight: "calc(100vh - 260px)" }}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute
            path="/project-tool"
            component={ProjectTool}
            project={project}
            setProject={setProject}
          />
          <PrivateRoute
            path="/projects"
            component={ProjectList}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
            setProject={setProject}
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
          <PrivateRoute
            path="/analysis"
            component={Analysis}
            project={project}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
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
