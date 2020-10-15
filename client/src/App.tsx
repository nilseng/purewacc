import React from "react";
import Container from "react-bootstrap/Container";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <NavBar />
      <Container className="p-4">
        <Landing />
      </Container>
    </>
  );
}

export default App;
