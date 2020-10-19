import { IRiskFreeRate } from "./RiskFreeRate";

export interface IProject {
  name: string;
  rfId?: string;
  branches: IBranch[];
}

export interface IBranch {
  id: number;
  name: string;
  weight: number;
  weightUnit?: string;
  industry?: string;
  betaId?: string;
  region?: string;
  marketId?: string;
}
