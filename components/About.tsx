import { FACILITATORS } from "@/lib/constants";

export default function About() {
  return (
    <section id="facilitadores" className="bg-navy-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
            Seus Facilitadores
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {FACILITATORS.map((f) => (
            <div
              key={f.name}
              className="flex flex-col items-center text-center bg-navy/60 rounded-2xl p-8 border border-cyan/20"
            >
              {f.image ? (
                <div className="w-28 h-28 rounded-full ring-4 ring-cyan/40 shadow-[0_0_20px_rgba(0,180,216,0.3)] mb-4 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-navy flex items-center justify-center ring-4 ring-cyan/40 shadow-[0_0_20px_rgba(0,180,216,0.3)] mb-4">
                  <span className="text-white text-2xl font-bold">{f.initials}</span>
                </div>
              )}

              <h3 className="text-lg font-bold text-white">{f.name}</h3>
              <p className="text-sm font-semibold text-cyan mb-3">{f.title}</p>
              <p className="text-sm text-white/60 leading-relaxed">{f.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
