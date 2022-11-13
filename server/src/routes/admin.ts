import express from "express";

import { betaCollection, marketReturnCollection, riskFreeRateCollection } from "../../database/databaseSetup";
import { checkAdminScope, checkJwt } from "../auth/auth";

const router = express.Router();

router.get("/risk-free-rates", async (req, res) => {
  const rfRates = await riskFreeRateCollection.find({}).toArray();
  res.status(200).json(rfRates);
});

router.post("/risk-free-rate", checkJwt, checkAdminScope, async (req, res) => {
  const rfRate = req.body;
  if (!((rfRate.rate === 0 || rfRate.rate) && rfRate.currency && rfRate.source)) {
    return res.status(400).json({ Error: "Invalid risk free rate object" });
  }
  rfRate.createdAt = Date.now();
  const doc = await riskFreeRateCollection.insertOne(rfRate);
  res.status(200).json(doc);
});

router.get("/betas", async (req, res) => {
  const betas = await betaCollection.find({}).toArray();
  res.status(200).json(betas);
});

router.post("/beta", checkJwt, checkAdminScope, async (req, res) => {
  const beta = req.body;
  if (!((beta.beta === 0 || beta.beta) && beta.industry && beta.source)) {
    return res.status(400).json({ Error: "Invalid beta object" });
  }
  beta.createdAt = Date.now();
  const doc = await betaCollection.insertOne(beta);
  res.status(200).json(doc);
});

router.get("/market-returns", async (req, res) => {
  const marketReturns = await marketReturnCollection.find({}).toArray();
  res.status(200).json(marketReturns);
});

router.post("/market-return", checkJwt, checkAdminScope, async (req, res) => {
  const marketReturn = req.body;
  if (!((marketReturn.return === 0 || marketReturn.return) && marketReturn.market && marketReturn.source)) {
    return res.status(400).json({ Error: "Invalid market return object" });
  }
  marketReturn.createdAt = Date.now();
  const doc = await marketReturnCollection.insertOne(marketReturn);
  res.status(200).json(doc);
});

export default router;
