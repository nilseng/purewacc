import React, { useState } from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [show, setShow] = useState(true);

  return show ? (
    <div className="bg-info px-4 py-3 text-dark w-100">
      PureWACC will give you an easy way of finding a company's cost of capital.
      Check out the WACC calculator while waiting for the good stuff.
      <FaIcon
        icon={faTimes}
        className="float-right mt-1"
        style={{ cursor: "pointer" }}
        onClick={() => setShow(false)}
      ></FaIcon>
    </div>
  ) : null;
};

export default Banner;
