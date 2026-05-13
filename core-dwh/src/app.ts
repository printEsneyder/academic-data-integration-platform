import dashboardRoutes from "./routes/dashboard.routes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import etlRoutes from "./routes/etl.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/etl", etlRoutes);

app.use("/api/etl", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Core DWH funcionando correctamente"
  });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
