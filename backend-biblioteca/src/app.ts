import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bibliotecaRoutes from "./routes/biblioteca.routes";
import { connectMongo } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", bibliotecaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Biblioteca funcionando"
  });
});

// Conectar a MongoDB
connectMongo();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});