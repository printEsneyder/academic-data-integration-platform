import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  biblioteca: any[];
}

export default function BibliotecaChart({ biblioteca }: Props) {
  const data = biblioteca.map((item) => ({
    nombre: item.nombre_estudiante,
    horas: item.total_horas_lectura_digital,
  }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Uso Biblioteca
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="nombre" stroke="#a1a1aa" />
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
