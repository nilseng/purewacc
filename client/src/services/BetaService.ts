import { IBeta } from "../models/Beta"

export const addBeta = async (token: any, beta: IBeta) => {
    const res = await fetch("/api/beta", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
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