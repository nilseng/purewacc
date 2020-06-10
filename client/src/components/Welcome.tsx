import React from "react";
import Card from "react-bootstrap/Card";

const Welcome = () => {
  return (
    <Card bg="dark">
      <Card.Title className="p-4">PureWACC</Card.Title>
      <Card.Body>
        PureWACC will provide a simple way to calculate cost of capital using
        betas specific to industry and geographic location. The calculation will
        be based on high quality data sources and methods.
      </Card.Body>
      <Card.Body>
        While waiting for the good stuff, feel free to use calculator below
        where you have to do the real work yourself.
      </Card.Body>
    </Card>
  );
};

export default Welcome;
