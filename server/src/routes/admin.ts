import express from 'express'

const router = express.Router()

router.get("/risk-free-rates", (req, res) => {
    res.status(200).json("Risk free rates at your service")
})

export default router