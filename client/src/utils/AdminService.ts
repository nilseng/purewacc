import { IRiskFreeRate } from "../models/RiskFreeRate";

export const addRiskFreeRate = async (rF: IRiskFreeRate) => {
    const res = await fetch("/risk-free-rate", {
        method: "POST",
        body: JSON.stringify(rF)
    })
    return res
}

export const getRiskFreeRates = async () => {
    const res = await fetch("/risk-free-rates")
    return res
}