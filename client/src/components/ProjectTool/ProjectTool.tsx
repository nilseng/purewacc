import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import { IBranch, IProject } from "../../models/Project";
import InitProject from "./InitProject";
import ProcessBar from "./ProcessBar";
import AddBranches from "./AddBranches";
import WACCCalculator from "./WACCCalculator";
import { getRiskFreeRates } from "../../services/RiskFreeRatefService";
import { getMarketReturns } from "../../services/MarketReturnService";
import { getBetas } from "../../services/BetaService";
import { IBeta } from "../../models/Beta";
import { IMarketReturn } from "../../models/MarketReturn";
import { IRiskFreeRate } from "../../models/RiskFreeRate";

const defaultProject: IProject = {
  name: "",
  branches: [
    { id: uuidv4(), name: "", weight: 0, industry: "all", region: "global" },
  ],
};

const projectProcess = ["initProject", "addBranches", "WACC"];

const calculateCostOfEquity = (
  project: IProject,
  rfRates: IRiskFreeRate[],
  betas: IBeta[],
  marketReturns: IMarketReturn[]
): number | undefined => {
  let sumOfWeights = 0; // Variable to store total weight of project branches. I.e. total project market cap.
  let tempProductSum = 0; // Temp variable to store the sum of weight*beta*ERP = weight*beta*(Rm-Rf)
  const rfRate = rfRates.find((rf) => rf._id === project.rfId);
  if (!rfRate) return undefined;
  project.branches.forEach((branch: IBranch) => {
    const beta = betas.find((b: IBeta) => b._id === branch.betaId);
    const marketReturn = marketReturns.find(
      (mr: IMarketReturn) => mr._id === branch.marketId
    );
    if (!beta || !marketReturn) return undefined;
    tempProductSum +=
      branch.weight * beta.beta * (marketReturn.return - rfRate.rate);
    sumOfWeights += branch.weight;
  });
  return rfRate.rate + tempProductSum / sumOfWeights;
};

const ProjectTool = () => {
  const [project, setProject] = useState(defaultProject);
  const [currentStep, setCurrenStep] = useState(0);
  const [rfRates, setRfRates] = useState([]);
  const [betas, setBetas] = useState([]);
  const [marketReturns, setMarketReturns] = useState([]);
  const [costOfEquity, setCostOfEquity] = useState(
    calculateCostOfEquity(project, rfRates, betas, marketReturns)
  );

  const handleInputChange = (event: any) => {
    setProject({
      ...project,
      [event.target.name]:
        event.target.type === "number"
          ? +event.target.value
          : event.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < projectProcess.length) {
      setCurrenStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrenStep(currentStep - 1);
  };

  useEffect(() => {
    getRiskFreeRates().then((res: []) => setRfRates(res));
    getBetas().then((res: []) => setBetas(res));
    getMarketReturns().then((res: []) => setMarketReturns(res));
  }, []);

  useEffect(() => {
    setCostOfEquity(
      calculateCostOfEquity(project, rfRates, betas, marketReturns)
    );
  }, [project, rfRates, betas, marketReturns]);

  return (
    <>
      <ProcessBar steps={projectProcess} currentStep={currentStep} />
      {/* 1. Initialize project with name and currency */}
      {projectProcess[currentStep] === "initProject" && (
        <InitProject
          project={project}
          handleInputChange={handleInputChange}
          rfRates={rfRates}
        />
      )}

      {/* 2. Add branches with industry and region to get betas and market returns */}
      {projectProcess[currentStep] === "addBranches" && (
        <AddBranches
          project={project}
          setProject={setProject}
          betas={betas}
          marketReturns={marketReturns}
          costOfEquity={costOfEquity}
        />
      )}
      {/* 3. Calculate WACC based on E, D, Re, Rd, Tc */}
      {projectProcess[currentStep] === "WACC" && (
        <WACCCalculator
          project={project}
          Re={costOfEquity || 0}
          handleInputChange={handleInputChange}
        />
      )}
      {currentStep > 0 && (
        <Button
          className="text-secondary m-4"
          variant="link"
          size="sm"
          onClick={prevStep}
        >
          <FaIcon className="mr-2" icon={faChevronLeft} />
          Back
        </Button>
      )}
      {currentStep < projectProcess.length - 1 && (
        <Button className="m-4" variant="link" size="sm" onClick={nextStep}>
          Next
          <FaIcon className="ml-2" icon={faChevronRight} />
        </Button>
      )}
    </>
  );
};

export default ProjectTool;
