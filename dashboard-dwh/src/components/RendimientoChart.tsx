import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface Props {
  estudiantes: any[];
}

export default function RendimientoChart({ estudiantes }: Props) {
  const data = estudiantes.map((item) => ({
    estudiante: item.nombres,
    rendimiento: item.semestre * 10,
  }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Rendimiento Académico
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="estudiante" />
          <PolarRadiusAxis />
          <Radar
            dataKey="rendimiento"
            stroke="#d4d4d8"
            fill="#71717a"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
