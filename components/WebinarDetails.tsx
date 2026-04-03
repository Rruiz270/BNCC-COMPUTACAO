import { SITE, HERO } from "@/lib/constants";

export default function WebinarDetails() {
  const details = [
    { icon: "calendar", label: "Data", value: SITE.webinarDate },
    { icon: "clock", label: "Horário", value: SITE.webinarTime },
    { icon: "timer", label: "Duração", value: SITE.webinarDuration },
    { icon: "users", label: "Facilitadores", value: "Emerson Pontos & Bruno Almeida" },
    { icon: "laptop", label: "Formato", value: SITE.format },
    { icon: "certificate", label: "Certificado", value: SITE.certificate },
    { icon: "package", label: "Material", value: SITE.material },
  ];

  function DetailIcon({ icon }: { icon: string }) {
    const iconMap: Record<string, string> = {
      calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      timer: "M12 8v4l3 3M3 12a9 9 0 1118 0 9 9 0 01-18 0zM16.5 3.5l2 2",
      users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      laptop: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      certificate: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      package: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    };
    return (
      <svg className="w-5 h-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconMap[icon] || iconMap.calendar} />
      </svg>
    );
  }

  return (
    <section id="webinar" className="relative bg-navy hex-pattern">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
            Detalhes do Webinar
          </h2>
          <p className="text-lg text-white/60">
            Tudo que você precisa saber antes de se inscrever.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-cyan/20 glow-cyan">
          <div className="grid sm:grid-cols-2 gap-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-gray transition-colors"
              >
                <div className="mt-0.5">
                  <DetailIcon icon={d.icon} />
                </div>
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
