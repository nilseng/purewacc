import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchDollar,
  faKey,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {!isAuthenticated && (
            <Nav.Item>
              <Button
                variant="link"
                className="mr-2"
                onClick={() => loginWithRedirect({})}
              >
                <FaIcon icon={faKey} style={{ marginRight: "0.4rem" }}></FaIcon>
                Log In
              </Button>
            </Nav.Item>
          )}
          {isAuthenticated && (
            <>
              <Nav.Link className="mr-2" onClick={() => logout()}>
                <FaIcon icon={faBan} style={{ marginRight: "0.4rem" }}></FaIcon>
                Log out
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
