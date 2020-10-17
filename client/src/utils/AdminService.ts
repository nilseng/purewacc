import { IRiskFreeRate } from "../models/RiskFreeRate";

export const addRiskFreeRate = async (rF: IRiskFreeRate) => {
    console.log(rF)
    const res = await fetch("/risk-free-rate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(rF)
    })
    return res
}

export const getRiskFreeRates = async () => {
    const res = await fetch("/risk-free-rates")
    return res
}