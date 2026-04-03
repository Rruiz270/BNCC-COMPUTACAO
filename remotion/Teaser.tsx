import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { COLORS, SLIDES } from "./constants";

/* ───── Shared helpers ───── */

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = spring({ frame: frame - delay, fps, config: { damping: 20 } });
  const translateY = interpolate(opacity, [0, 1], [30, 0]);
  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
      {children}
    </div>
  );
}

function SlideBackground({
  children,
  bg,
  overlay = "rgba(6,24,64,0.82)",
  image,
}: {
  children: React.ReactNode;
  bg?: string;
  overlay?: string;
  image?: string;
}) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg ?? COLORS.navyDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {image && (
        <>
          <Img
            src={staticFile(image)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: overlay,
            }}
          />
        </>
      )}
      {/* Subtle hex-grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `radial-gradient(${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
}

function Logo({ size = 60 }: { size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.2,
          background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.green} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 32px ${COLORS.cyan}44`,
        }}
      >
        <span style={{ color: COLORS.white, fontSize: size * 0.45, fontWeight: 800, fontFamily: "Inter, sans-serif" }}>
          i10
        </span>
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 5,
        background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.green} 100%)`,
      }}
    />
  );
}

/* ───── Slide 1: Intro ───── */
function IntroSlide({ title, subtitle }: { title: string; subtitle: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });

  return (
    <SlideBackground image="images/img1_cover_classroom.jpg" overlay="rgba(6,24,64,0.88)">
      <div style={{ transform: `scale(${logoScale})`, marginBottom: 32 }}>
        <Logo size={100} />
      </div>
      <FadeIn delay={12}>
        <p style={{ color: COLORS.textGray, fontSize: 28, textAlign: "center", fontFamily: "Inter, sans-serif", letterSpacing: 3, textTransform: "uppercase" }}>
          {subtitle}
        </p>
      </FadeIn>
      <FadeIn delay={22}>
        <h1 style={{ color: COLORS.white, fontSize: 52, fontWeight: 800, textAlign: "center", fontFamily: "Inter, sans-serif", letterSpacing: -1 }}>
          {title}
        </h1>
      </FadeIn>
      <BottomBar />
    </SlideBackground>
  );
}

/* ───── Slide 2: Headline ───── */
function HeadlineSlide({ title, subtitle }: { title: string; subtitle: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineWidth = spring({ frame, fps, config: { damping: 30 } });

  return (
    <SlideBackground image="images/img4_technology.jpg" overlay="rgba(10,36,99,0.85)">
      <FadeIn>
        <h1 style={{ color: COLORS.white, fontSize: 64, fontWeight: 800, textAlign: "center", lineHeight: 1.15, fontFamily: "Inter, sans-serif", letterSpacing: -1, padding: "0 60px" }}>
          {title}
        </h1>
      </FadeIn>
      <div
        style={{
          width: `${lineWidth * 240}px`,
          height: 5,
          background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.green})`,
          margin: "28px auto",
          borderRadius: 3,
        }}
      />
      <FadeIn delay={15}>
        <p style={{ color: COLORS.green, fontSize: 42, fontWeight: 700, textAlign: "center", fontFamily: "Inter, sans-serif" }}>
          {subtitle}
        </p>
      </FadeIn>
      <BottomBar />
    </SlideBackground>
  );
}

/* ───── Slide 3-5: Stat ───── */
function StatSlide({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12 } });

  const isAlert = value === "2.5%";
  const accentColor = isAlert ? "#EF4444" : COLORS.cyan;

  return (
    <SlideBackground>
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <p style={{ color: accentColor, fontSize: 140, fontWeight: 800, lineHeight: 1, marginBottom: 4, fontFamily: "Inter, sans-serif", textShadow: `0 0 60px ${accentColor}33` }}>
          {value}
        </p>
      </div>
      <FadeIn delay={10}>
        <p style={{ color: COLORS.white, fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 20, fontFamily: "Inter, sans-serif" }}>
          {label}
        </p>
      </FadeIn>
      <FadeIn delay={20}>
        <p style={{ color: COLORS.textGray, fontSize: 24, textAlign: "center", whiteSpace: "pre-line", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
          {description}
        </p>
      </FadeIn>
      <BottomBar />
    </SlideBackground>
  );
}

/* ───── Slide 6: Pillars ───── */
function PillarsSlide({ title, items }: { title: string; items: string[] }) {
  const pillarColors = [COLORS.cyan, "#EAB308", COLORS.green];
  const pillarIcons = ["📋", "💰", "🚀"];

  return (
    <SlideBackground image="images/img1_cover_classroom.jpg" overlay="rgba(10,36,99,0.90)">
      <FadeIn>
        <h2 style={{ color: COLORS.white, fontSize: 44, fontWeight: 800, textAlign: "center", marginBottom: 56, fontFamily: "Inter, sans-serif" }}>
          {title}
        </h2>
      </FadeIn>
      <div style={{ display: "flex", gap: 36, padding: "0 60px" }}>
        {items.map((item, i) => (
          <FadeIn key={item} delay={15 + i * 12}>
            <div
              style={{
                backgroundColor: `${pillarColors[i]}18`,
                border: `3px solid ${pillarColors[i]}`,
                borderRadius: 20,
                padding: "36px 52px",
                textAlign: "center",
                minWidth: 220,
                boxShadow: `0 8px 32px ${pillarColors[i]}22`,
              }}
            >
              <p style={{ fontSize: 40, marginBottom: 12 }}>{pillarIcons[i]}</p>
              <p style={{ color: pillarColors[i], fontSize: 30, fontWeight: 800, fontFamily: "Inter, sans-serif", letterSpacing: 2 }}>
                {item}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
      <BottomBar />
    </SlideBackground>
  );
}

/* ───── Slide 7: CTA ───── */
function CTASlide({ title, subtitle, cta }: { title: string; subtitle: string; cta: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = interpolate(frame % (fps * 2), [0, fps, fps * 2], [1, 1.06, 1]);

  return (
    <SlideBackground image="images/img4_technology.jpg" overlay="rgba(6,24,64,0.90)">
      <FadeIn>
        <Logo size={56} />
      </FadeIn>
      <div style={{ height: 28 }} />
      <FadeIn delay={5}>
        <p style={{ color: COLORS.cyan, fontSize: 24, fontWeight: 600, textAlign: "center", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16, fontFamily: "Inter, sans-serif" }}>
          {title}
        </p>
      </FadeIn>
      <FadeIn delay={12}>
        <h2 style={{ color: COLORS.white, fontSize: 52, fontWeight: 800, textAlign: "center", marginBottom: 44, fontFamily: "Inter, sans-serif", letterSpacing: -1 }}>
          {subtitle}
        </h2>
      </FadeIn>
      <FadeIn delay={20}>
        <div
          style={{
            transform: `scale(${pulse})`,
            background: `linear-gradient(135deg, ${COLORS.green} 0%, #00C48A 100%)`,
            padding: "22px 56px",
            borderRadius: 14,
            boxShadow: `0 8px 40px ${COLORS.green}44`,
          }}
        >
          <p style={{ color: COLORS.navyDark, fontSize: 26, fontWeight: 800, textAlign: "center", fontFamily: "Inter, sans-serif" }}>
            {cta}
          </p>
        </div>
      </FadeIn>
      <BottomBar />
    </SlideBackground>
  );
}

/* ───── Main composition ───── */
export const Teaser: React.FC = () => {
  const slideDuration = 4 * 30; // 4 seconds at 30fps = 120 frames

  return (
    <AbsoluteFill>
      {SLIDES.map((slide, index) => {
        const from = index * slideDuration;
        return (
          <Sequence key={index} from={from} durationInFrames={slideDuration}>
            {slide.type === "intro" && (
              <IntroSlide title={slide.title} subtitle={slide.subtitle!} />
            )}
            {slide.type === "headline" && (
              <HeadlineSlide title={slide.title} subtitle={slide.subtitle!} />
            )}
            {slide.type === "stat" && (
              <StatSlide
                value={slide.value!}
                label={slide.label!}
                description={slide.description!}
              />
            )}
            {slide.type === "pillars" && (
              <PillarsSlide title={slide.title} items={slide.items!} />
            )}
            {slide.type === "cta" && (
              <CTASlide
                title={slide.title}
                subtitle={slide.subtitle!}
                cta={slide.cta!}
              />
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
