import { HERO } from "@/lib/constants";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient hex-pattern">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-serif">
          Garanta sua vaga agora
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
          Vagas limitadas. Inscreva-se gratuitamente e receba o link de acesso
          direto no seu e-mail.
        </p>
        <a
          href="#inscricao"
          className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-white text-navy font-bold text-lg hover:brightness-95 transition-all shadow-lg"
        >
          {HERO.cta}
        </a>
      </div>
    </section>
  );
}
