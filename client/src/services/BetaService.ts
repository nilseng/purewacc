import { IBeta } from "../models/Beta"

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