import { IBeta } from "../models/Beta";
import { IMarketReturn } from "../models/MarketReturn";
import { IBranch, IProject } from "../models/Project";
import { IRiskFreeRate } from "../models/RiskFreeRate";

export const calculateWACC = (
  E: number = 0,
  Re: number = 0,
  D: number = 0,
  Rd: number = 0,
  Tc: number = 0
) => {
  const V = E + D;
  return V ? (E / V) * Re + (D / V) * Rd * (1 - Tc) : 0;
};

export const calculateProjectWACC = (
  project: IProject,
  riskFreeRates: IRiskFreeRate[],
  betas: IBeta[],
  marketReturns: IMarketReturn[]
) => {
  const E = project.equity ? project.equity : 0;
  let Re = calculateCostOfEquity(project, riskFreeRates, betas, marketReturns);
  Re = Re ? Re : 0;
  const D = project.debt ? project.debt : 0;
  const Rd = project.costOfDebt ? project.costOfDebt : 0;
  const Tc = project.tax ? project.tax : 0;

  const V = E + D;
  return V ? (E / V) * Re + (D / V) * Rd * (1 - Tc) : 0;
};

export const calculateCostOfEquity = (
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
