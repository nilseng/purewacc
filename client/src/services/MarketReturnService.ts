import { IMarketReturn } from "../models/MarketReturn"

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