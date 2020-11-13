import express from 'express'

import { projectCollection } from "../../database/databaseSetup"
import { checkJwt } from '../auth/auth'

const router = express.Router()

router.post("/", checkJwt, async (req: any, res) => {
    const project = req.body
    project.createdAt = Date.now()
    project.createdBy = req.user.sub
    const doc = await projectCollection.insertOne(project)
    res.status(200).json(doc.ops[0])
})

router.get("/all", checkJwt, async (req: any, res) => {
    const projects = await projectCollection.find({ createdBy: req.user.sub }).toArray()
    return res.status(200).json(projects)
})

export default router