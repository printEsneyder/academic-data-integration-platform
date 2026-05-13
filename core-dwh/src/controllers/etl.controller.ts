import { Request, Response } from "express";

import { obtenerDashboard } from "../services/etl.service";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {

    const datos = await obtenerDashboard();

    res.json({
      success: true,
      total: datos.length,
      data: datos
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error obteniendo dashboard"
    });

  }
};