import { IRiskFreeRate } from "./RiskFreeRate";

export interface IProject {
  name: string;
  rfId?: string;
  branches: IBranch[];
  debt?: number;
  equity?: number;
  tax?: number;
  costOfDebt?: number;
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
