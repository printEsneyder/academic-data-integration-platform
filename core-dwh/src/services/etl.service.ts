import axios from "axios";

export async function obtenerDashboard() {
  try {
    const academicApi = process.env.ACADEMIC_API;
    const bibliotecaApi = process.env.BIBLIOTECA_API;
    const laboratoriosApi = process.env.LABORATORIOS_API;

    const [
      estudiantesResponse,
      bibliotecaResponse,
      laboratoriosResponse
    ] = await Promise.all([
      axios.get(`${academicApi}/estudiantes`),
      axios.get(`${bibliotecaApi}/recursos-biblioteca`),
      axios.get(`${laboratoriosApi}/laboratorios`)
    ]);

    const estudiantes = estudiantesResponse.data.data;
    const biblioteca = bibliotecaResponse.data.data || [];
    const laboratorios = laboratoriosResponse.data.data || [];

    const dashboard = estudiantes.map((estudiante: any) => {

      const idEstudiante = String(estudiante.id_estudiante);

      const bibliotecaEstudiante = biblioteca.find(
        (b: any) => b.numero_documento === idEstudiante
      );

      const laboratoriosEstudiante = laboratorios.filter(
        (l: any) => l.id_estudiante === idEstudiante
      );

      const horasLaboratorio = laboratoriosEstudiante.reduce(
        (total: number, actual: any) =>
          total + actual.duracion_horas,
        0
      );

      return {
        estudiante: `${estudiante.nombres} ${estudiante.apellidos}`,
        semestre: estudiante.semestre,

        uso_biblioteca: bibliotecaEstudiante?.nivel_actividad || "Sin datos",

        horas_laboratorio: horasLaboratorio
      };
    });

    return dashboard;

  } catch (error) {
    console.log(error);

    throw new Error("Error generando dashboard");
  }
}