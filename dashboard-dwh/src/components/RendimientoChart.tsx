import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { Laboratorio } from "../types/dashboard.types";

interface Props {
  laboratorios: Laboratorio[];
}

export default function RendimientoChart({ laboratorios }: Props) {
  const porEstudiante = laboratorios.reduce<Record<string, { nombre: string; horas: number }>>(
    (acc, item) => {
      if (!acc[item.nombre]) {
        acc[item.nombre] = { nombre: item.nombre, horas: 0 };
      }
      acc[item.nombre].horas += item.duracion_horas || 0;
      return acc;
    },
    {}
  );

  const data = Object.values(porEstudiante)
    .map((item) => ({
      estudiante: item.nombre,
      horas: Math.round(item.horas * 100) / 100,
    }))
    .sort((a, b) => b.horas - a.horas)
    .slice(0, 8);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Horas de Laboratorio por Estudiante
      </h2>

      {data.length === 0 ? (
        <p className="text-zinc-500">No hay datos de laboratorio.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid stroke="#3f3f46" />
            <PolarAngleAxis dataKey="estudiante" stroke="#a1a1aa" />
            <PolarRadiusAxis stroke="#3f3f46" />
            <Radar
              dataKey="horas"
              stroke="#f472b6"
              fill="#f472b6"
              fillOpacity={0.35}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: 8 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}