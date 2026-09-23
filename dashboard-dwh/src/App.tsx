import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import KPICard from "./components/KPICard";

import TotalHorasChart from "./components/TotalHorasChart";
import EstudiantesChart from "./components/EstudiantesChart";
import BibliotecaChart from "./components/BibliotecaChart";
import RendimientoChart from "./components/RendimientoChart";
import SemestresChart from "./components/SemestresChart";

import { obtenerDashboard } from "./services/dashboard.service";

import type { DashboardData } from "./types/dashboard.types";

function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const response = await obtenerDashboard();
        setData(response);
      } catch (err) {
        console.error(err);
        setError(
          "No se pudo conectar con el Core DWH. Verifica que los microservicios estén en ejecución."
        );
      } finally {
        setLoading(false);
      }
    };

    cargarDashboard();
  }, []);

  const reintentar = () => {
    setLoading(true);
    setError(null);

    obtenerDashboard()
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError(
          "No se pudo conectar con el Core DWH. Verifica que los microservicios estén en ejecución."
        );
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-zinc-100 rounded-full animate-spin"></div>
        <p className="text-zinc-400">Cargando Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-6 p-8">
        <h2 className="text-2xl font-semibold text-red-400">Error de conexión</h2>
        <p className="text-zinc-400 text-center max-w-md">{error}</p>
        <button
          onClick={reintentar}
          className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        Sin datos disponibles.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            titulo="Total Estudiantes"
            valor={data.totalEstudiantes}
          />

          <KPICard
            titulo="Recursos Biblioteca"
            valor={data.totalRecursosBiblioteca}
          />

          <KPICard
            titulo="Horas Laboratorio"
            valor={`${Math.round(data.totalHorasLaboratorio * 100) / 100} h`}
          />

          <KPICard
            titulo="Registros Laboratorio"
            valor={data.laboratorios.length}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <EstudiantesChart estudiantes={data.estudiantes} />
          <SemestresChart estudiantes={data.estudiantes} />
          <BibliotecaChart biblioteca={data.biblioteca} />
          <TotalHorasChart laboratorios={data.laboratorios} />
          <RendimientoChart laboratorios={data.laboratorios} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;