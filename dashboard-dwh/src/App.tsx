import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import KPICard from "./components/KPICard";

import TotalHorasChart from "./components/TotalHorasChart";
import EstudiantesChart from "./components/EstudiantesChart";
import BibliotecaChart from "./components/BibliotecaChart";
import RendimientoChart from "./components/RendimientoChart";

import { obtenerDashboard } from "./services/dashboard.service";

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const response = await obtenerDashboard();
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    cargarDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        Cargando Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            valor={data.totalHorasLaboratorio}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TotalHorasChart horas={data.totalHorasLaboratorio} />
          <EstudiantesChart estudiantes={data.estudiantes} />
          <BibliotecaChart biblioteca={data.biblioteca} />
          <RendimientoChart estudiantes={data.estudiantes} />
        </div>
      </div>
    </div>
  );
}

export default App;
