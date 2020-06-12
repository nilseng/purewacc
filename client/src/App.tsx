import React from "react";
import Container from "react-bootstrap/Container";

import NavBar from "./components/NavBar";
import Calculator from "./components/Calculator";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <NavBar />
      <Banner />
      <Container className="p-4">
        <Calculator />
      </Container>
    </>
  );
}

export default App;
