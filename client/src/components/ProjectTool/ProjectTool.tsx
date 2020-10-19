import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { IProject } from "../../models/Project";
import InitProject from "./InitProject";
import ProcessBar from "./ProcessBar";
import AddBranches from "./AddBranches";
import WACCCalculator from "./WACCCalculator";
import { getRiskFreeRates } from "../../utils/RfService";

const defaultProject: IProject = {
  name: "",
  branches: [{ id: 1, name: "", weight: 1, industry: "all", region: "global" }],
};

const projectProcess = ["initProject", "addBranches", "WACC"];

const ProjectTool = () => {
  const [project, setProject] = useState(defaultProject);
  const [currentStep, setCurrenStep] = useState(0);
  const [rfRates, setRfRates] = useState([]);

  const handleInputChange = (event: any) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  const nextStep = () => {
    if (currentStep < projectProcess.length) {
      setCurrenStep(currentStep + 1);
    }
  };

  useEffect(() => {
    console.log(project);
    getRiskFreeRates().then((res) => {
      setRfRates(res);
    });
  }, [project]);

  return (
    <>
      <ProcessBar />
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
          handleInputChange={handleInputChange}
        />
      )}
      {/* 3. Calculate WACC based on E, D, Re, Rd, Tc */}
      {projectProcess[currentStep] === "WACC" && <WACCCalculator />}
      <Button className="my-4" variant="primary" size="sm" onClick={nextStep}>
        Next
        <FaIcon className="ml-2" icon={faChevronRight} />
      </Button>
    </>
  );
};

export default ProjectTool;
