import React from "react";
import Container from "react-bootstrap/Container";
import { Switch, Route, Router } from "react-router-dom";

import history from "./utils/history";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Project from "./components/Project";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator";
import AdminTool from "./components/AdminTool/AdminTool";

function App() {
  return (
    <Router history={history}>
      <NavBar />
      <Container
        className="px-0 py-5 d-flex flex-column"
        style={{ minHeight: "calc(100vh - 259px)" }}
      >
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/project" component={Project} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/admin" component={AdminTool} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
