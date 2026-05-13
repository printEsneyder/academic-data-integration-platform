import { Request, Response } from "express";

import {
  getEstudiantes,
  getAsignaturas,
  getCursos,
  getMatriculas,
  getCalificaciones
} from "../repositories/academic.repository";

export const estudiantesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getEstudiantes();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo estudiantes"
    });
  }
};

export const asignaturasController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAsignaturas();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo asignaturas"
    });
  }
};

export const cursosController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getCursos();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo cursos"
    });
  }
};

export const matriculasController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getMatriculas();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo matrículas"
    });
  }
};

export const calificacionesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getCalificaciones();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo calificaciones"
    });
  }
};