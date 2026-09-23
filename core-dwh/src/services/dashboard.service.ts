import axios from "axios";

interface Estudiante {
  id_estudiante: number;
  nombres: string;
  apellidos: string;
  correo: string;
  semestre: number;
}

interface RecursoBiblioteca {
  numero_documento: string;
  nombre_estudiante: string;
  total_horas_lectura_digital: number;
  nivel_actividad: string;
}

interface Laboratorio {
  id_estudiante: string;
  nombre: string;
  semestre: number;
  fecha: string;
  equipo: string;
  duracion_horas: number;
}

const API_PATHS = {
  academic: process.env.ACADEMIC_API || "http://localhost:3000/api",
  biblioteca: process.env.BIBLIOTECA_API || "http://localhost:4000/api",
  laboratorios: process.env.LABORATORIOS_API || "http://localhost:3002/api"
};

export interface DashboardCompleto {
  totalEstudiantes: number;
  totalRecursosBiblioteca: number;
  totalHorasLaboratorio: number;
  estudiantes: Estudiante[];
  biblioteca: RecursoBiblioteca[];
  laboratorios: Laboratorio[];
}

export const obtenerDashboard = async (): Promise<DashboardCompleto> => {
  try {
    const [
      estudiantesResponse,
      bibliotecaResponse,
      laboratoriosResponse
    ] = await Promise.all([
      axios.get(`${API_PATHS.academic}/estudiantes`),
      axios.get(`${API_PATHS.biblioteca}/recursos-biblioteca`),
      axios.get(`${API_PATHS.laboratorios}/laboratorios`)
    ]);

    const estudiantes: Estudiante[] = estudiantesResponse.data.data || [];

    const biblioteca: RecursoBiblioteca[] = bibliotecaResponse.data.data || [];

    const laboratorios: Laboratorio[] = laboratoriosResponse.data.data || [];

    const totalEstudiantes = estudiantes.length;

    const totalRecursosBiblioteca = biblioteca.length;

    const totalHorasLaboratorio = laboratorios.reduce(
      (acc: number, item: Laboratorio) => acc + (item.duracion_horas || 0),
      0
    );

    return {
      totalEstudiantes,
      totalRecursosBiblioteca,
      totalHorasLaboratorio,
      estudiantes,
      biblioteca,
      laboratorios
    };
  } catch (error) {
    console.error("Error obteniendo dashboard:", error);
    throw new Error("Error obteniendo dashboard");
  }
};