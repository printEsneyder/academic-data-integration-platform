import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Biblioteca } from "../types/dashboard.types";

interface Props {
  biblioteca: Biblioteca[];
}

export default function BibliotecaChart({ biblioteca }: Props) {
  const data = biblioteca.map((item) => ({
    nombre: item.nombre_estudiante,
    horas: item.total_horas_lectura_digital || 0,
  }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Uso Biblioteca (horas de lectura digital)
      </h2>

      {data.length === 0 ? (
        <p className="text-zinc-500">No hay datos de biblioteca.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="nombre" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: 8 }}
            />
            <Bar
              dataKey="horas"
              fill="#fbbf24"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}