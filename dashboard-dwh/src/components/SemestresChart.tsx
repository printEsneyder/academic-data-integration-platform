import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Estudiante } from "../types/dashboard.types";

interface Props {
  estudiantes: Estudiante[];
}

export default function SemestresChart({ estudiantes }: Props) {
  const conteo = estudiantes.reduce<Record<number, number>>((acc, item) => {
    acc[item.semestre] = (acc[item.semestre] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(conteo)
    .sort((a, b) => Number(a) - Number(b))
    .map((semestre) => ({
      semestre: `Semestre ${semestre}`,
      estudiantes: conteo[Number(semestre)],
    }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Distribución de Semestres
      </h2>

      {data.length === 0 ? (
        <p className="text-zinc-500">No hay datos de semestres.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="semestre" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: 8 }} />
            <Bar
              dataKey="estudiantes"
              fill="#818cf8"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}