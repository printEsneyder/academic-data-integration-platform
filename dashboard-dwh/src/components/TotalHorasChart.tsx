import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  horas: number;
}

export default function TotalHorasChart({ horas }: Props) {
  const data = [{ name: "Laboratorio", horas }];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-zinc-100">
        Horas de Laboratorio
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip />

          <Bar
            dataKey="horas"
            fill="#71717a"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
