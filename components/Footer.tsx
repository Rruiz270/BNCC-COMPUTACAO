export default function Footer() {
  return (
    <footer className="bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-sm">i10</span>
            </div>
            <span className="font-bold text-white text-lg">Instituto i10</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              Sobre
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              Contato
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              Privacidade
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Instituto i10. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
