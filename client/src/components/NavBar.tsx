import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faBan,
  faList,
  faPlus,
  faDatabase,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

import AnimatedLogo from "./AnimatedLogo";

interface IProps {
  resetProject: any;
}

const NavBar = ({ resetProject }: IProps) => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

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
          {isLoading && <AnimatedLogo height={"2rem"} width={"2rem"} />}
          {!isLoading && (
            <>
              {isAuthenticated && (
                <Nav.Link
                  href="/project-tool"
                  className="btn btn-sm btn-outline-primary text-light mr-sm-4"
                  style={{ textDecoration: "none" }}
                  onClick={resetProject}
                >
                  <FaIcon icon={faPlus} className="mr-2"></FaIcon>
                  New Project
                </Nav.Link>
              )}
              <Nav.Link
                href="/data"
                className="btn btn-sm text-light mr-2"
                style={{ textDecoration: "none" }}
                onClick={resetProject}
              >
                <FaIcon icon={faDatabase} className="mr-2"></FaIcon>
                Data
              </Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link
                    className="btn btn-sm text-light mr-2"
                    href="/projects"
                  >
                    <FaIcon
                      icon={faList}
                      style={{ marginRight: "0.4rem" }}
                    ></FaIcon>
                    Projects
                  </Nav.Link>
                  <Nav.Link
                    className="btn btn-sm text-muted mr-2"
                    onClick={() => logout()}
                  >
                    <FaIcon
                      icon={faBan}
                      style={{ marginRight: "0.4rem" }}
                    ></FaIcon>
                    Log out
                  </Nav.Link>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Nav.Link
                    className="btn btn-outline-primary text-light btn-sm mr-2"
                    onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                  >
                    <FaIcon
                      icon={faKey}
                      style={{ marginRight: "0.4rem" }}
                    ></FaIcon>
                    Sign up
                  </Nav.Link>
                  <Nav.Link
                    className="btn btn-sm text-light mr-2"
                    onClick={() => loginWithRedirect()}
                  >
                    <FaIcon
                      icon={faUserNinja}
                      style={{ marginRight: "0.4rem" }}
                    ></FaIcon>
                    Log in
                  </Nav.Link>
                </>
              )}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
