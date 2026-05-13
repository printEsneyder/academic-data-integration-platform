import { Request, Response } from "express";
import { limpiarCSV } from "../services/csvCleaner.service";

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
    res.status(500).json({
      success: false,
      message: "Error procesando CSV"
    });
  }
};