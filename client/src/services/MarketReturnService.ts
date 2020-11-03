import { IMarketReturn } from "../models/MarketReturn"

export const addMarketReturn = async (token: any, mr: IMarketReturn) => {
    const res = await fetch("/api/market-return", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
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