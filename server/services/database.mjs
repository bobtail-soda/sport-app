import { MongoClient } from "mongodb";
import dotenv from "dotenv";


dotenv.config();

const connectionString = process.env.DATABASE_URI || "";

const databaseClient = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await databaseClient.connect();
} catch(e) {
  console.error(e);
}

export default databaseClient;