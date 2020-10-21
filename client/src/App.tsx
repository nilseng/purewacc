import React from "react";
import Container from "react-bootstrap/Container";
import { Switch, Route, Router } from "react-router-dom";

import history from "./utils/history";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import WACCCalculator from "./components/ProjectTool/WACCCalculator";
import AdminTool from "./components/AdminTool/AdminTool";
import ProjectTool from "./components/ProjectTool/ProjectTool";

function App() {
  return (
    <Router history={history}>
      <NavBar />
      <Container style={{ minHeight: "calc(100vh - 259px)" }}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/calculator" component={WACCCalculator} />
          <PrivateRoute path="/admin" component={AdminTool} />
          <PrivateRoute path="/project-tool" component={ProjectTool} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
