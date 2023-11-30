// import {
//  MongoClient,
//  ObjectId,
//} from "https://deno.land/x/atlas_sdk@1.1.2/mod.ts";
import { MongoClient, ServerApiVersion } from "npm:mongodb@6.3";
import "https://deno.land/std@0.208.0/dotenv/load.ts";

// Configure a MongoDB client
const username = encodeURIComponent(Deno.env.get("MONGODB_USER"));
const password = encodeURIComponent(Deno.env.get("MONGODB_PASSWORD"));
const clusterUrl = encodeURIComponent("cluster0.mc93mg6.mongodb.net");
const url = `mongodb+srv://${username}:${password}@${clusterUrl}`;

const client = new MongoClient(
  url,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
    }
  }
);

const dbClient = client.db("testDB");

export default dbClient;
