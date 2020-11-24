import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import { IProject } from "../../models/Project";
import InitProject from "./InitProject";
import ProcessBar from "./ProcessBar";
import AddBranches from "./AddBranches";
import WACCCalculator from "./WACCCalculator";
import { createProject } from "../../services/ProjectService";
import { getRiskFreeRates } from "../../services/RiskFreeRatefService";
import { getMarketReturns } from "../../services/MarketReturnService";
import { getBetas } from "../../services/BetaService";
import { calculateCostOfEquity } from "../../services/CalculationService";

const projectProcess = ["initProject", "addBranches", "WACC"];

interface IProps {
  project: IProject;
  setProject: any;
}

const ProjectTool = ({ project, setProject }: IProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

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
        event.target.type === "number" && event.target.value
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

  const saveProject = async () => {
    const token = await getAccessTokenSilently();
    await createProject(token, project);
    history.push("/projects");
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
      {currentStep === projectProcess.length - 1 && (
        <Button
          className="text-success m-4"
          variant="link"
          size="sm"
          onClick={saveProject}
        >
          Save <FaIcon className="ml-2" icon={faCheck} />
        </Button>
      )}
    </>
  );
};

export default ProjectTool;
