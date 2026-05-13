import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  estudiantes: any[];
}

const COLORS = [
  "#3f3f46",
  "#52525b",
  "#71717a",
  "#a1a1aa",
];

export default function EstudiantesChart({ estudiantes }: Props) {
  const data = estudiantes.map((item) => ({
    name: item.nombres,
    value: item.semestre,
  }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Semestres Estudiantes
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
