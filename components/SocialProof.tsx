import { SOCIAL_PROOF } from "@/lib/constants";

export default function SocialProof() {
  return (
    <section className="bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-4">
          {SOCIAL_PROOF.map((item) => (
            <div key={item.value} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-cyan mb-2 font-serif text-glow-cyan">
                {item.value}
              </p>
              <p className="text-base font-semibold text-white mb-1">
                {item.label}
              </p>
              <p className="text-sm text-white/50 max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
