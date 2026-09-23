import { Router, Request, Response } from "express";
import { getDb } from "../config/database";

const router = Router();

interface RecursoBiblioteca {
  numero_documento: string;
  nombre_estudiante: string;
  total_horas_lectura_digital: number;
  nivel_actividad: string;
}

const DATOS_EJEMPLO: RecursoBiblioteca[] = [
  {
    numero_documento: "1085500001",
    nombre_estudiante: "Esneyder Ibarra",
    total_horas_lectura_digital: 15,
    nivel_actividad: "ALTO"
  },
  {
    numero_documento: "1085500002",
    nombre_estudiante: "Jhon Bolaños",
    total_horas_lectura_digital: 8,
    nivel_actividad: "MEDIO"
  },
  {
    numero_documento: "1085500003",
    nombre_estudiante: "German Andrade",
    total_horas_lectura_digital: 3,
    nivel_actividad: "BAJO"
  }
];

router.get("/recursos-biblioteca", async (req: Request, res: Response) => {
  try {
    const db = getDb();

    let recursos: RecursoBiblioteca[] = [];

    if (db) {
      const coleccion = db.collection<RecursoBiblioteca>("recursos_biblioteca");

      recursos = await coleccion.find({}).limit(50).toArray();
    }

    if (recursos.length === 0) {
      recursos = DATOS_EJEMPLO;
    }

    res.json({
      success: true,
      total: recursos.length,
      data: recursos
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error obteniendo recursos de biblioteca"
    });
  }
});

export default router;