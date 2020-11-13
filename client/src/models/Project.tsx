import { IRiskFreeRate } from "./RiskFreeRate";

export interface IProject {
  name: string;
  rfId?: string;
  branches: IBranch[];
  debt?: number;
  equity?: number;
  tax?: number;
  costOfDebt?: number;
  createdAt?: number;
  createdBy?: string;
}

export interface IBranch {
  id: string;
  name: string;
  weight: number;
  weightUnit?: string;
  industry?: string;
  betaId?: string;
  region?: string;
  marketId?: string;
}
