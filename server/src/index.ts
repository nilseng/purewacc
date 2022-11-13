import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import sslRedirect from "heroku-ssl-redirect";
import morgan from "morgan";
import path from "path";

import connectToMongoDb from "../database/databaseSetup";
import adminRouter from "./routes/admin";
import projectRouter from "./routes/project";

dotenv.config();

const app = express();

app.use(sslRedirect());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/project", projectRouter);
app.use("/api", adminRouter);

app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/*", express.static(path.join(__dirname, "../../client/build", "index.html")));

const startApp = async () => {
  await connectToMongoDb();
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`The server is now running on port ${process.env.PORT || 4000}`)
  );
};

startApp();
