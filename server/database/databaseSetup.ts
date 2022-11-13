import { Collection, MongoClient } from "mongodb";

let projectCollection: Collection,
  riskFreeRateCollection: Collection,
  betaCollection: Collection,
  marketReturnCollection: Collection;

const connectToMongoDb = async () => {
  const db_uri = process.env.DB_URI;
  if (!db_uri) {
    throw Error("MongoDB URI not found");
  }

  const client = await MongoClient.connect(db_uri);
  console.log(`Mongoclient connected to database server.`);

  projectCollection = client.db().collection("projects");
  riskFreeRateCollection = client.db().collection("riskFreeRates");
  betaCollection = client.db().collection("betas");
  marketReturnCollection = client.db().collection("marketReturns");

  //Connection events
  client.on("connected", () => {
    console.log("Mongoose connected to " + db_uri);
  });
  client.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
  });
  client.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  //Capture app termination/restart events
  //To be called when process is restarted or terminated
  const gracefulShutdown = (msg: string, callback: any) => {
    client.close(() => {
      console.log("Mongo client disconnected through " + msg);
      callback();
    });
  };

  //For app termination
  process.on("SIGINT", () => {
    gracefulShutdown("app termination", () => {
      process.exit(0);
    });
  });
  //For Heroku app termination
  process.on("SIGTERM", () => {
    gracefulShutdown("Heroku app termination", () => {
      process.exit(0);
    });
  });
};

export { projectCollection, riskFreeRateCollection, betaCollection, marketReturnCollection };

export default connectToMongoDb;
