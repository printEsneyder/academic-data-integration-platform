import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

const client = new MongoClient(uri);

let db: Db | null = null;

export const connectMongo = async (): Promise<Db | null> => {
  try {
    await client.connect();

    db = client.db();

    console.log("Conectado a MongoDB");

    return db;
  } catch (error) {
    console.warn("No se pudo conectar a MongoDB, se usará la información de ejemplo:", error);

    return null;
  }
};

export const getDb = (): Db | null => db;

export default client;