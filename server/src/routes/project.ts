import express from 'express'
import { ObjectID } from 'mongodb'

import { projectCollection } from "../../database/databaseSetup"
import { checkJwt } from '../auth/auth'

const router = express.Router()

router.post("/", checkJwt, async (req: any, res) => {
    const project = req.body
    project.createdAt = Date.now()
    project.createdBy = req.user.sub
    const projectId = project._id ? new ObjectID(project._id) : ''
    delete project._id
    const doc = await projectCollection.replaceOne({ _id: projectId }, project, { upsert: true })
    res.status(200).json(doc.ops[0])
})

router.get("/all", checkJwt, async (req: any, res) => {
    const projects = await projectCollection.find({ createdBy: req.user.sub }).toArray()
    return res.status(200).json(projects)
})

export default router