import React from "react";
import Container from "react-bootstrap/Container";
import { Switch, Route, Router } from "react-router-dom";

import history from "./utils/history";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Project from "./components/Project";

function App() {
  return (
    <Router history={history}>
      <NavBar />
      <Container
        className="p-4 d-flex flex-column justify-content-center"
        style={{ minHeight: "calc(100vh - 59px)" }}
      >
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/project" component={Project} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
