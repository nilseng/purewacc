import React from "react";
import Container from "react-bootstrap/Container";

import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Calculator from "./components/Calculator";

function App() {
  return (
    <>
      <NavBar />
      <Container className="p-4">
        <Welcome />
        <Calculator />
      </Container>
    </>
  );
}

export default App;
