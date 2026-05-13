import { pool } from "../config/database";

export const getEstudiantes = async () => {
  const result = await pool.query("SELECT * FROM estudiantes");
  return result.rows;
};

export const getAsignaturas = async () => {
  const result = await pool.query("SELECT * FROM asignaturas");
  return result.rows;
};

export const getCursos = async () => {
  const result = await pool.query("SELECT * FROM cursos");
  return result.rows;
};

export const getMatriculas = async () => {
  const result = await pool.query("SELECT * FROM matriculas");
  return result.rows;
};

export const getCalificaciones = async () => {
  const result = await pool.query("SELECT * FROM calificaciones");
  return result.rows;
};