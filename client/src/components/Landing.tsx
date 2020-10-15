import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

import { useAuth0 } from "../react-auth0-spa";

const Landing = () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (loading) return <p>Loading...</p>;
  return (
    <div className="d-flex flex-column align-items-center">
      <p>Welcome to Pure WACC</p>
      {!isAuthenticated && (
        <div>
          <Button variant="secondary" onClick={() => loginWithRedirect({})}>
            <FaIcon icon={faKey} style={{ marginRight: "0.4rem" }}></FaIcon>
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};

export default Landing;
