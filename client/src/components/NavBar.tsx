import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faSearchDollar } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="md" collapseOnSelect>
      <Navbar.Brand style={{ color: "#f8f9fa" }}>
        <FaIcon icon={faSearchDollar} className="mr-1" />
        PureWACC
      </Navbar.Brand>
      <Navbar.Toggle
        className="mb-2"
        aria-controls="basic-navbar-nav"
        style={{ outline: "none" }}
      />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-end"
      ></Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
