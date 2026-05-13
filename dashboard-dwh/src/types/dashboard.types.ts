export interface Estudiante {
  id_estudiante: number;
  nombres: string;
  apellidos: string;
  correo: string;
  semestre: number;
}

export interface Biblioteca {
  numero_documento: string;
  nombre_estudiante: string;
  total_horas_lectura_digital: number;
  nivel_actividad: string;
}

export interface Laboratorio {
  id_estudiante: string;
  nombre: string;
  semestre: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
  equipo: string;
  duracion_horas: number;
}

export interface DashboardData {
  totalEstudiantes: number;
  totalRecursosBiblioteca: number;
  totalHorasLaboratorio: number;
  estudiantes: Estudiante[];
  biblioteca: Biblioteca[];
  laboratorios: Laboratorio[];
}
