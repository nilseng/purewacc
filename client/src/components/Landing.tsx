import React from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="d-flex flex-column align-items-center p-4">
      <h5 className="m-4">Welcome to Pure WACC</h5>
      <Link
        to="/project-tool"
        className="btn btn-outline-primary text-light"
        style={{ textDecoration: "none" }}
      >
        <FaIcon icon={faPlus} className="mr-2"></FaIcon>
        New Project
      </Link>
    </div>
  );
};

export default Landing;
