import academicRoutes from "./routes/academic.routes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", academicRoutes);

pool.connect()
  .then(() => {
    console.log("Conectado a PostgreSQL correctamente");
  })
  .catch((error: any) => {
    console.error("Error conectando PostgreSQL:", error);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Academic Record funcionando correctamente"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});