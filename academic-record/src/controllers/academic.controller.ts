import { Request, Response } from "express";

import {
  getEstudiantes,
  getAsignaturas,
  getCursos,
  getMatriculas,
  getCalificaciones
} from "../repositories/academic.repository";

const responderConData = async (res: Response, accion: () => Promise<any[]>, mensaje: string) => {
  try {
    const data = await accion();

    res.json({
      success: true,
      total: data.length,
      data
    });
  } catch (error) {
    console.error(mensaje, error);

    res.status(500).json({
      success: false,
      message: mensaje
    });
  }
};

export const estudiantesController = async (req: Request, res: Response) => {
  await responderConData(res, getEstudiantes, "Error obteniendo estudiantes");
};

export const asignaturasController = async (req: Request, res: Response) => {
  await responderConData(res, getAsignaturas, "Error obteniendo asignaturas");
};

export const cursosController = async (req: Request, res: Response) => {
  await responderConData(res, getCursos, "Error obteniendo cursos");
};

export const matriculasController = async (req: Request, res: Response) => {
  await responderConData(res, getMatriculas, "Error obteniendo matrículas");
};

export const calificacionesController = async (req: Request, res: Response) => {
  await responderConData(res, getCalificaciones, "Error obteniendo calificaciones");
};