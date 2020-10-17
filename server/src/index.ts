import express from "express"
import path from 'path'
import morgan from 'morgan'

import adminRoutes from './routes/admin'

const app = express()

app.use(morgan("tiny"));

app.use("/", adminRoutes)

app.use(express.static(path.join(__dirname, '../../client/build')))

app.listen({ port: process.env.PORT || 4000 }, () => console.log(`The server is now running on port ${process.env.PORT || 4000}`))