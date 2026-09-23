import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Estudiante } from "../types/dashboard.types";

interface Props {
  estudiantes: Estudiante[];
}

const COLORS = [
  "#818cf8",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#22d3ee",
  "#a78bfa",
];

export default function EstudiantesChart({ estudiantes }: Props) {
  const porSemestre = estudiantes.reduce<Record<number, number>>((acc, item) => {
    acc[item.semestre] = (acc[item.semestre] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(porSemestre)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([semestre, cantidad]) => ({
      name: `Semestre ${semestre}`,
      value: cantidad,
    }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Estudiantes por Semestre
      </h2>

      {data.length === 0 ? (
        <p className="text-zinc-500">No hay datos de estudiantes.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={55}
              paddingAngle={2}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}