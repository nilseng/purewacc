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
import ProjectList from "./components/ProjectList";
import About from "./components/About";

function App() {
  return (
    <Router history={history}>
      <NavBar />
      <Container style={{ minHeight: "calc(100vh - 260px)" }}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/project-tool" component={ProjectTool} />
          <PrivateRoute path="/projects" component={ProjectList} />
          <PrivateRoute path="/calculator" component={WACCCalculator} />
          <PrivateRoute path="/admin" component={AdminTool} />
          <Route path="/about" component={About} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
