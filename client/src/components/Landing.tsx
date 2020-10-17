import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Card
      bg="dark"
      className="p-4 d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <h5 className="m-4">Welcome to Pure WACC</h5>
      <Button
        variant="outline-primary"
        onClick={() => console.log("create new project")}
      >
        <FaIcon icon={faPlus} className="mr-2"></FaIcon>
        <Link
          to="/project"
          className="text-light"
          style={{ textDecoration: "none" }}
        >
          New Project
        </Link>
      </Button>
    </Card>
  );
};

export default Landing;
