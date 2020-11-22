import React from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";

const Landing = () => {
  return (
    <div className="py-4">
      <Jumbotron className="bg-dark">
        <h5>Welcome to Pure WACC</h5>
        <p>
          Pure WACC is under development. The purpose of the solution is to
          provide high quality WACC calculations in an easy and transparent
          manner. Feel free to try creating a project to get a feel of how it
          will work.
        </p>
        <Link
          to="/project-tool"
          className="btn btn-outline-primary text-light mb-4"
          style={{ textDecoration: "none" }}
        >
          <FaIcon icon={faPlus} className="mr-2"></FaIcon>
          New Project
        </Link>
      </Jumbotron>
    </div>
  );
};

export default Landing;
