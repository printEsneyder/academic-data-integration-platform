import { Request, Response } from "express";
import { limpiarCSV, obtenerEstadisticas } from "../services/csvCleaner.service";

export const obtenerLaboratorios = (
  req: Request,
  res: Response
) => {
  try {
    const datos = limpiarCSV();

    res.json({
      success: true,
      total: datos.length,
      data: datos
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error procesando CSV"
    });
  }
};

export const obtenerEstadisticasController = (
  req: Request,
  res: Response
) => {
  try {
    const estadisticas = obtenerEstadisticas();

    res.json({
      success: true,
      data: estadisticas
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error obteniendo estadísticas de laboratorios"
    });
  }
};