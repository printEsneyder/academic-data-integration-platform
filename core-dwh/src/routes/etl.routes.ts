import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

const API_PATHS = {
  academic: process.env.ACADEMIC_API || "http://localhost:3000/api",
  biblioteca: process.env.BIBLIOTECA_API || "http://localhost:4000/api",
  laboratorios: process.env.LABORATORIOS_API || "http://localhost:3002/api"
};

router.get("/status", async (req: Request, res: Response) => {
  const servicios = [
    { nombre: "academic-record", url: API_PATHS.academic, estado: "desconocido" },
    { nombre: "backend-biblioteca", url: API_PATHS.biblioteca, estado: "desconocido" },
    { nombre: "backend-laboratorios", url: API_PATHS.laboratorios, estado: "desconocido" }
  ];

  const estados = await Promise.all(
    servicios.map(async (servicio) => {
      try {
        await axios.get(servicio.url, { timeout: 3000 });
        return { ...servicio, estado: "online" };
      } catch (error) {
        return { ...servicio, estado: "offline" };
      }
    })
  );

  res.json({
    success: true,
    message: "ETL Core funcionando",
    servicios: estados
  });
});

export default router;