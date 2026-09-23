export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6 px-6 mt-8 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-zinc-500 text-sm">
          Dashboard ETL · Arquitectura e Integración de Datos · Universidad Mariana
        </p>

        <p className="text-zinc-400 text-sm">
          Desarrollado por{" "}
          <a
            href="https://github.com/printEsneydr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 underline hover:text-white transition-colors"
          >
            Esneyder Ibarra
          </a>
        </p>
      </div>
    </footer>
  );
}