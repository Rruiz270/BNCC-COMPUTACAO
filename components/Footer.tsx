function FooterLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 60"
      className={className}
      aria-label="Instituto i10"
    >
      <defs>
        <linearGradient
          id="footGrad"
          x1="0"
          y1="30"
          x2="100"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#00E5A0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="30" r="4" fill="#00B4D8" />
      <circle cx="34" cy="14" r="4" fill="#00E5A0" />
      <circle cx="56" cy="34" r="4" fill="#00B4D8" />
      <circle cx="78" cy="20" r="4" fill="#00B4D8" />
      <circle cx="100" cy="42" r="4" fill="#00E5A0" />
      <line x1="12" y1="30" x2="34" y2="14" stroke="url(#footGrad)" strokeWidth="2" />
      <line x1="34" y1="14" x2="56" y2="34" stroke="url(#footGrad)" strokeWidth="2" />
      <line x1="56" y1="34" x2="78" y2="20" stroke="url(#footGrad)" strokeWidth="2" />
      <line x1="78" y1="20" x2="100" y2="42" stroke="url(#footGrad)" strokeWidth="2" />
      <text x="116" y="34" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5" fill="white">i</text>
      <text x="128" y="34" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5" fill="#00E5A0">10</text>
      <text x="116" y="50" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="10" letterSpacing="0.5" fill="rgba(255,255,255,0.5)">Instituto</text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <FooterLogo className="h-10 w-auto" />
            <p className="text-xs text-white/40 italic">
              Orquestrando o Futuro da Educação Pública
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Contato
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Privacidade
            </a>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

        <div className="mt-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Instituto i10. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
