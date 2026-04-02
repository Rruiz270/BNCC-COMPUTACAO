import { SITE, HERO } from "@/lib/constants";

export default function WebinarDetails() {
  const details = [
    { icon: "📅", label: "Data", value: SITE.webinarDate },
    { icon: "🕐", label: "Horario", value: SITE.webinarTime },
    { icon: "⏱️", label: "Duracao", value: SITE.webinarDuration },
    { icon: "👤", label: "Facilitador", value: `${SITE.facilitator} (${SITE.name})` },
    { icon: "💻", label: "Formato", value: SITE.format },
    { icon: "📜", label: "Certificado", value: SITE.certificate },
    { icon: "📦", label: "Material", value: SITE.material },
  ];

  return (
    <section id="webinar" className="bg-gradient-to-br from-cyan to-cyan/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Detalhes do Webinar
          </h2>
          <p className="text-lg text-white/80">
            Tudo que voce precisa saber antes de se inscrever.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <div className="grid sm:grid-cols-2 gap-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-gray transition-colors"
              >
                <span className="text-xl">{d.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider">
                    {d.label}
                  </p>
                  <p className="text-base font-medium text-text-dark">
                    {d.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#inscricao"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-green text-navy-dark font-bold text-base hover:brightness-110 transition-all"
            >
              {HERO.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
