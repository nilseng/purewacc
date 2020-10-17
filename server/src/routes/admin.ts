import express from 'express'

import { riskFreeRateCollection } from "../../database/databaseSetup"

const router = express.Router()

router.get("/risk-free-rates", async (req, res) => {
    const rfRates = await riskFreeRateCollection.find({}).toArray()
    res.status(200).json(rfRates)
})

router.post("/risk-free-rate", async (req, res) => {
    const rfRate = req.body
    //TODO: Find a better way to validate
    if (!((rfRate.rate === 0 || rfRate.rate) && rfRate.currency && rfRate.source)) {
        return res.status(400).json({ Error: "Invalid risk free rate object" })
    }
    rfRate.createdAt = Date.now()
    const doc = await riskFreeRateCollection.insertOne(rfRate)
    res.status(200).json({ msg: "risk free rate saved" })
})

export default router