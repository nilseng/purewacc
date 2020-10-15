import express from "express"
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, '../../client/build')))

app.listen({ port: process.env.PORT || 4000 }, () => console.log(`The server is now running on port ${process.env.PORT || 4000}`))