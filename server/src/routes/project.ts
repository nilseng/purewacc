import express from 'express'

import { projectCollection } from "../../database/databaseSetup"
import { checkJwt } from '../auth/auth'

const router = express.Router()

router.post("/", checkJwt, async (req, res) => {
    const project = req.body
    if (!project.name) {
        return res.status(400).json({ Error: "The project has no name." })
    }
    project.createdAt = Date.now()
    const doc = await projectCollection.insertOne(project)
    res.status(200).json(doc.ops[0])
})

export default router