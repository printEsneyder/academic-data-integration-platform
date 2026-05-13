export interface Estudiante {
  id_estudiante: number;
  nombres: string;
  apellidos: string;
  correo: string;
  semestre: number;
}

export interface Asignatura {
  id_asignatura: number;
  nombre: string;
  creditos: number;
}

export interface Curso {
  id_curso: number;
  id_asignatura: number;
  grupo: string;
}

export interface Matricula {
  id_matricula: number;
  id_estudiante: number;
  id_curso: number;
}

export interface Calificacion {
  id_calificacion: number;
  id_estudiante: number;
  id_asignatura: number;
  seguimiento1: number;
  seguimiento2: number;
  seguimiento3: number;
  nota_final: number;
}