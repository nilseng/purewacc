import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faQuestionCircle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedLogo from "./AnimatedLogo";

const Footer = () => {
  return (
    <footer className="page-footer font-small bg-dark text-white pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">Resources</h5>
            <ul className="list-group">
              <li className="list-group-item bg-dark border-0">
                <Link to="/about" className="text-light">
                  <FaIcon icon={faQuestionCircle} className="mr-2"></FaIcon>
                  About
                </Link>
              </li>
              <li className="list-group-item bg-dark border-0">
                <Link to="/about" className="text-light">
                  <FaIcon icon={faShieldAlt} className="mr-2"></FaIcon>
                  Privacy
                </Link>
              </li>
              <li className="list-group-item bg-dark border-0">
                <a href="https://www.pureokrs.com" className="text-light">
                  <AnimatedLogo height="1rem" width="1rem" />
                  <span className="ml-2">Pure OKRs</span>
                </a>
              </li>
            </ul>
          </div>
          <hr className="clearfix w-100 d-md-none pb-3" />
          <div className="col-md-6 mb-md-0 mb-3">
            <h5 className="text-uppercase">Get in touch</h5>
            <ul className="list-group">
              <li className="list-group-item bg-dark border-0">
                <a className="text-light" href="mailto:contact@pureokrs.com">
                  <FaIcon icon={faEnvelope} className="mr-2"></FaIcon>
                  contact@pureokrs.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
