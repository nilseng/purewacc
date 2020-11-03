import { IRiskFreeRate } from "../models/RiskFreeRate";
import { IBeta } from "../models/Beta"
import { IMarketReturn } from "../models/MarketReturn";

export const addBeta = async (beta: IBeta) => {
    const res = await fetch("/api/beta", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(beta)
    })
    return res.json()
}

export const getBetas = async () => {
    const res = await fetch("/api/betas")
    return res.json()
}

export const addMarketReturn = async (mr: IMarketReturn) => {
    const res = await fetch("/api/market-return", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mr)
    })
    return res.json()
}

export const getMarketReturns = async () => {
    const res = await fetch("/api/market-returns")
    return res.json()
}