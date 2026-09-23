import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Laboratorio } from "../types/dashboard.types";

interface Props {
  laboratorios: Laboratorio[];
}

export default function TotalHorasChart({ laboratorios }: Props) {
  const porEquipo = laboratorios.reduce<Record<string, number>>((acc, item) => {
    acc[item.equipo] = (acc[item.equipo] || 0) + (item.duracion_horas || 0);
    return acc;
  }, {});

  const data = Object.entries(porEquipo)
    .map(([equipo, horas]) => ({
      equipo,
      horas: Math.round(horas * 100) / 100,
    }))
    .sort((a, b) => b.horas - a.horas)
    .slice(0, 8);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-zinc-100">
        Horas por Equipo de Laboratorio
      </h2>

      {data.length === 0 ? (
        <p className="text-zinc-500">No hay datos de laboratorio.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" stroke="#a1a1aa" />
            <YAxis
              type="category"
              dataKey="equipo"
              stroke="#a1a1aa"
              width={60}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: 8 }}
            />
            <Bar
              dataKey="horas"
              fill="#34d399"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}