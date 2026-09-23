export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-5 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
            Dashboard de Integracion de Datos
          </h1>
          <p className="text-zinc-400 text-sm">
            Arquitectura e Integracion de Datos
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Sistema en linea
          </span>
        </div>
      </div>
    </nav>
  );
}