import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const About = () => {
  return (
    <Container className="py-4">
      <Card className="my-4 p-4" bg="dark">
        <h5>What is Pure WACC?</h5>
        <p>
          Pure WACC is a software for calculating Weighted Average Cost of
          Capital (WACC).
        </p>
      </Card>
      <Card className="my-4 p-4" bg="dark">
        <h5>Philosophy</h5>
        <p>
          When making investment decisions, we care about the future and not so
          much about the past. That's why WACC calculations should reflect the
          future composition of a company when it comes to risk and leverage.
        </p>
      </Card>
      <Card className="my-4 p-4" bg="dark">
        <h5>Planned Features</h5>
        <ul>
          <li>
            Detailed WACC report: How is the WACC calculated? What are the
            sources for risk free rates, betas and market returns? What is the
            theory behind the calculation?
          </li>
          <li>
            Share WACC Calculations with other users - for instance colleagues
            or fellow students.
          </li>
          <li>
            Sensitivity analysis: How does increased leverage affect the
            currenct WACC? What happens to the WACC if a company branch is moved
            to another country?
          </li>
        </ul>
      </Card>
    </Container>
  );
};

export default About;
