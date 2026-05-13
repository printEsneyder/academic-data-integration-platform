import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import laboratoriosRoutes from "./routes/laboratorios.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/laboratorios", laboratoriosRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Laboratorios funcionando correctamente"
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});