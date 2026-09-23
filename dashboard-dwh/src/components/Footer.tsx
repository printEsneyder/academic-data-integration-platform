export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6 px-6 mt-8 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 text-center">
        <p className="text-zinc-500 text-sm">
          Academic Data Integration & Analytics Platform
        </p>

        <p className="text-zinc-400 text-sm">
          Desarrollado por Esneyder Ibarra
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
          <a
            href="https://github.com/printEsneydr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/esneyder-ibarra-rosero"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            LinkedIn
          </a>
          <a
            href="mailto:esneydribarra1970@gmail.com"
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            esneydribarra1970@gmail.com
          </a>
          <span>+57 323 215 7962</span>
        </div>
      </div>
    </footer>
  );
}