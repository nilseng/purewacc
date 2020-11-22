import express from "express"
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import connectToMongoDb from "../database/databaseSetup"
import adminRouter from './routes/admin'
import projectRouter from './routes/project'

dotenv.config()

const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(morgan("tiny"))

app.use("/project", projectRouter)
app.use("/api", adminRouter)

app.use(express.static(path.join(__dirname, '../../client/build')))

connectToMongoDb()

app.listen({ port: process.env.PORT || 4000 }, () => console.log(`The server is now running on port ${process.env.PORT || 4000}`))

app.use('/*', express.static(path.join(__dirname, '../../client/build', 'index.html')))