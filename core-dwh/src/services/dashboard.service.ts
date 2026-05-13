import axios from "axios";

export const obtenerDashboard = async () => {
  try {

    // =========================
    // CONSUMIR MICROSERVICIOS
    // =========================

    const estudiantesResponse = await axios.get(
      "http://localhost:3000/api/estudiantes"
    );

    const bibliotecaResponse = await axios.get(
      "http://localhost:4000/api/recursos-biblioteca"
    );

    const laboratoriosResponse = await axios.get(
      "http://localhost:3002/api/laboratorios"
    );

    // =========================
    // EXTRAER DATA
    // =========================

    const estudiantes = estudiantesResponse.data.data;

    const biblioteca = bibliotecaResponse.data.data;

    const laboratorios = laboratoriosResponse.data.data;

    // =========================
    // KPIs SIMPLES
    // =========================

    const totalEstudiantes = estudiantes.length;

    const totalRecursosBiblioteca = biblioteca.length;

    const totalHorasLaboratorio = laboratorios.reduce(
      (acc: number, item: any) => acc + item.duracion_horas,
      0
    );

    // =========================
    // RETORNAR DASHBOARD
    // =========================

    return {
      totalEstudiantes,
      totalRecursosBiblioteca,
      totalHorasLaboratorio,
      estudiantes,
      biblioteca,
      laboratorios,
    };

  } catch (error) {

    console.log(error);

    throw new Error("Error obteniendo dashboard");
  }
};