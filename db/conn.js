import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.ATLAS_URI);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to db")
} catch (e) {
  console.error(e);
}

let db = conn.db("events");

export default db;