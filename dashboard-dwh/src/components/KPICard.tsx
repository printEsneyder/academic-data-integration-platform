interface Props {
  titulo: string;
  valor: number | string;
}

export default function KPICard({ titulo, valor }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:bg-zinc-800 transition-all duration-300">
      <h2 className="text-zinc-400 text-sm">{titulo}</h2>
      <p className="text-4xl font-bold text-zinc-100 mt-2">{valor}</p>
    </div>
  );
}
