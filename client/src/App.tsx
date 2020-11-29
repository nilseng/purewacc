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
import AdminTool from "./components/AdminTool/AdminTool";
import ProjectTool from "./components/ProjectTool/ProjectTool";
import ProjectList from "./components/ProjectList";
import About from "./components/About";
import { getRiskFreeRates } from "./services/RiskFreeRatefService";
import { getBetas } from "./services/BetaService";
import { getMarketReturns } from "./services/MarketReturnService";
import Analysis from "./components/Analysis";
import { IProject } from "./models/Project";
import Data from "./components/Data";
import CookieConsent from "react-cookie-consent";
import { IBeta } from "./models/Beta";
import { IMarketReturn } from "./models/MarketReturn";
import { IRiskFreeRate } from "./models/RiskFreeRate";

const defaultProject: IProject = {
  name: "",
  branches: [{ id: uuidv4(), name: "", weight: "", industry: "", region: "" }],
};

function App() {
  const { loginWithRedirect } = useAuth0();

  const [project, setProject] = useState(defaultProject);
  const [betas, setBetas] = useState<IBeta[]>();
  const [marketReturns, setMarketReturns] = useState<IMarketReturn[]>();
  const [riskFreeRates, setRiskFreeRates] = useState<IRiskFreeRate[]>();

  const [riskFreeRate, setRiskFreeRate] = useState<IRiskFreeRate>();

  const resetProject = () => {
    setProject(defaultProject);
  };

  useEffect(() => {
    getBetas().then((betas) => setBetas(betas));
    getMarketReturns().then((mrs) => setMarketReturns(mrs));
    getRiskFreeRates().then((rfRates) => setRiskFreeRates(rfRates));
  }, []);

  useEffect(() => {
    setRiskFreeRate(riskFreeRates?.find((rf) => rf._id === project.rfId));
  }, [riskFreeRates, project]);

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
            riskFreeRate={riskFreeRate}
          />
          <PrivateRoute
            path="/projects"
            component={ProjectList}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
            setProject={setProject}
          />
          <PrivateRoute
            path="/analysis"
            component={Analysis}
            project={project}
            betas={betas}
            marketReturns={marketReturns}
            riskFreeRates={riskFreeRates}
          />
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
          <Route
            path="/data"
            render={(props: any) => (
              <Data
                betas={betas || []}
                marketReturns={marketReturns || []}
                riskFreeRates={riskFreeRates || []}
              />
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/login" render={() => loginWithRedirect()} />
          <Route path="/*" component={Landing} />
        </Switch>
      </Container>
      <Footer />
      <CookieConsent
        disableStyles={true}
        style={{
          backgroundColor: "#212529",
          position: "sticky",
          bottom: 0,
        }}
        buttonClasses="btn btn-warning btn-sm"
        containerClasses="col-lg-12 d-flex flex-row justify-content-between p-4"
      >
        <small>
          Pure WACC is using cookies to improve the user experience.
        </small>
      </CookieConsent>
    </Router>
  );
}

export default App;
