import { HERO } from "@/lib/constants";
import SubscribeForm from "./SubscribeForm";
import TeaserPlayer from "./TeaserPlayer";

export default function Hero() {
  return (
    <section
      id="inscricao"
      className="relative overflow-hidden"
    >
      {/* Photo background with navy overlay + hex pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/img1_cover_classroom.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text + Video */}
          <div className="text-center lg:text-left lg:pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/20 text-cyan text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              WEBINAR GRATUITO — 15 DE ABRIL
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 font-serif">
              {HERO.headline}
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              {HERO.subheadline}
            </p>

            {/* Teaser Video */}
            <div className="w-full max-w-lg mx-auto lg:mx-0 mb-8 lg:mb-0">
              <TeaserPlayer />
            </div>
          </div>

          {/* Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
