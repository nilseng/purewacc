import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faBan,
  faList,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

import AnimatedLogo from "./AnimatedLogo";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar bg="dark" expand="md" collapseOnSelect>
      <Navbar.Brand className="text-light" href="/">
        <AnimatedLogo height={"2rem"} width={"2rem"} />
        <span className="ml-1">
          Pure WACC
          <span className="h6 font-italic text-primary ml-2">BETA</span>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle
        className="mb-2"
        aria-controls="basic-navbar-nav"
        style={{ outline: "none" }}
      />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {!isAuthenticated && (
            <>
              <Nav.Item>
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                >
                  <FaIcon
                    icon={faKey}
                    style={{ marginRight: "0.4rem" }}
                  ></FaIcon>
                  Sign up
                </Button>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="link"
                  className="text-light mr-2"
                  onClick={() => loginWithRedirect()}
                >
                  <FaIcon
                    icon={faKey}
                    style={{ marginRight: "0.4rem" }}
                  ></FaIcon>
                  Log in
                </Button>
              </Nav.Item>
            </>
          )}
          {isAuthenticated && (
            <>
              <Nav.Link
                href="/project-tool"
                className="btn btn-sm btn-outline-primary text-light mr-sm-4"
                style={{ textDecoration: "none" }}
              >
                <FaIcon icon={faPlus} className="mr-2"></FaIcon>
                New Project
              </Nav.Link>
              <Nav.Link className="text-light mr-2" href="/projects">
                <FaIcon
                  icon={faList}
                  style={{ marginRight: "0.4rem" }}
                ></FaIcon>
                Projects
              </Nav.Link>
              <Nav.Link className="text-light mr-2" onClick={() => logout()}>
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
