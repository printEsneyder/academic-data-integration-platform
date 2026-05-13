import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

const client = new MongoClient(uri);

export const connectMongo = async () => {
  try {
    await client.connect();

    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default client;