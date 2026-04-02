import { PILLARS } from "@/lib/constants";

export default function Pillars() {
  return (
    <section id="pilares" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            O que voce vai aprender
          </h2>
          <p className="text-lg text-text-gray max-w-2xl mx-auto">
            2 horas divididas em 3 pilares essenciais para implementar a BNCC
            Computacao na sua rede.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className={`rounded-2xl border-2 ${pillar.color} ${pillar.bgColor} p-6 sm:p-8 transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{pillar.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-text-dark">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-semibold text-text-gray">
                    {pillar.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-dark"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-navy"
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
