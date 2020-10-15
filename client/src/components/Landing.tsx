import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useAuth0 } from "../react-auth0-spa";
import Card from "react-bootstrap/Card";

const Landing = () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (loading) return <p>Loading...</p>;
  return (
    <Card
      bg="dark"
      className="p-4 d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <h5 className="m-4">Welcome to Pure WACC</h5>
      {!isAuthenticated && (
        <div>
          <Button variant="secondary" onClick={() => loginWithRedirect({})}>
            <FaIcon icon={faKey} style={{ marginRight: "0.4rem" }}></FaIcon>
            Sign up
          </Button>
        </div>
      )}
      {isAuthenticated && (
        <>
          <Button
            variant="outline-primary"
            onClick={() => console.log("create new project")}
          >
            <FaIcon icon={faPlus} className="mr-2"></FaIcon>
            <span className="text-light">New Project</span>
          </Button>
        </>
      )}
    </Card>
  );
};

export default Landing;
