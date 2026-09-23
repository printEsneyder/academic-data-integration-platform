import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Falta la variable DATABASE_URL en el archivo .env");
  process.exit(1);
}

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (error) => {
  console.error("Error inesperado en el pool de PostgreSQL:", error);
});