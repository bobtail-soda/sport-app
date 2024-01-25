// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

// const connectionString = process.env.DATABASE_URI || "";

// const client = new MongoClient(connectionString);

// let conn;
// try {
//   console.log("Connecting to MongoDB Atlas...");
//   conn = await client.connect();
// } catch (error) {
//   console.error(error);
// }


// export default client;

import { MongoClient } from "mongodb";
import dotenv from "dotenv";


dotenv.config();

const connectionString = process.env.DATABASE_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

export default client;