import { IRiskFreeRate } from "../models/RiskFreeRate"

export const getRiskFreeRates = async () => {
    const res = await fetch("/api/risk-free-rates")
    return res.json()
}

export const addRiskFreeRate = async (token: any, rF: IRiskFreeRate) => {
    const res = await fetch("/api/risk-free-rate", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rF)
    })
    return res.json()
}