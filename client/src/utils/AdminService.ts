import { IRiskFreeRate } from "../models/RiskFreeRate";
import { IBeta } from "../models/Beta"

export const addRiskFreeRate = async (rF: IRiskFreeRate) => {
    const res = await fetch("/risk-free-rate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rF)
    })
    return res.json()
}

export const getRiskFreeRates = async () => {
    const res = await fetch("/risk-free-rates")
    return res.json()
}

export const addBeta = async (beta: IBeta) => {
    const res = await fetch("/beta", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(beta)
    })
    return res.json()
}

export const getBetas = async () => {
    const res = await fetch("/betas")
    return res.json()
}