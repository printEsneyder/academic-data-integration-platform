export interface LaboratorioRegistro {
  id_estudiante: string;
  nombre: string;
  semestre: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
  equipo: string;
  duracion_horas: number;
}