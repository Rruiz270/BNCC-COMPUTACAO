import { SITE } from "@/lib/constants";

export default function About() {
  return (
    <section id="facilitador" className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Seu Facilitador
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-bg-gray rounded-2xl p-8 sm:p-10">
          {/* Photo placeholder */}
          <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center shrink-0">
            <span className="text-white text-2xl font-bold">RR</span>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-text-dark">
              {SITE.facilitator}
            </h3>
            <p className="text-sm font-semibold text-cyan mb-4">
              {SITE.facilitatorTitle}
            </p>
            <p className="text-base text-text-gray leading-relaxed">
              {SITE.facilitatorBio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
