import { PILLARS } from "@/lib/constants";

function PillarIcon({ icon }: { icon: string }) {
  if (icon === "rules") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#00B4D8" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="3" />
        <path d="M10 12h12M10 16h12M10 20h8" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "resources") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#00B4D8" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 10v6l4 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22l-2 4M22 22l2 4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#00B4D8" strokeWidth="1.5">
      <path d="M6 28V12l10-8 10 8v16H6z" />
      <rect x="12" y="18" width="8" height="10" />
      <circle cx="16" cy="12" r="2" fill="#00B4D8" />
    </svg>
  );
}

export default function Pillars() {
  return (
    <section id="pilares" className="bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
            O que você vai aprender
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            2 horas divididas em 3 pilares essenciais para implementar a BNCC
            Computação na sua rede.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-cyan/20 bg-navy/60 p-6 sm:p-8 transition-all hover:-translate-y-1 hover:glow-cyan"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center">
                  <PillarIcon icon={pillar.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-semibold text-cyan">
                    {pillar.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-cyan"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
