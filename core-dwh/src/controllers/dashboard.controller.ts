import { Request, Response } from "express";

import { obtenerDashboard } from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response
) => {

  try {

    const data = await obtenerDashboard();

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error obteniendo dashboard"
    });

  }

};