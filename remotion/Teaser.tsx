import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, SLIDES } from "./constants";

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

function IntroSlide({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navyDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FadeIn>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            backgroundColor: COLORS.cyan,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span
            style={{ color: COLORS.white, fontSize: 32, fontWeight: 700 }}
          >
            i10
          </span>
        </div>
      </FadeIn>
      <FadeIn delay={10}>
        <p
          style={{
            color: COLORS.textGray,
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {subtitle}
        </p>
      </FadeIn>
      <FadeIn delay={20}>
        <h1
          style={{
            color: COLORS.white,
            fontSize: 48,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      </FadeIn>
    </AbsoluteFill>
  );
}

function HeadlineSlide({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineWidth = spring({ frame, fps, config: { damping: 30 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navy,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <FadeIn>
        <h1
          style={{
            color: COLORS.white,
            fontSize: 56,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
      </FadeIn>
      <div
        style={{
          width: `${lineWidth * 200}px`,
          height: 4,
          backgroundColor: COLORS.cyan,
          margin: "24px auto",
          borderRadius: 2,
        }}
      />
      <FadeIn delay={15}>
        <p
          style={{
            color: COLORS.green,
            fontSize: 36,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {subtitle}
        </p>
      </FadeIn>
    </AbsoluteFill>
  );
}

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

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navyDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <p
          style={{
            color: COLORS.cyan,
            fontSize: 120,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {value}
        </p>
      </div>
      <FadeIn delay={10}>
        <p
          style={{
            color: COLORS.white,
            fontSize: 32,
            fontWeight: 600,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {label}
        </p>
      </FadeIn>
      <FadeIn delay={20}>
        <p
          style={{
            color: COLORS.textGray,
            fontSize: 22,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </p>
      </FadeIn>
    </AbsoluteFill>
  );
}

function PillarsSlide({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const pillarColors = [COLORS.cyan, COLORS.cyan, COLORS.green];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navy,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <FadeIn>
        <h2
          style={{
            color: COLORS.white,
            fontSize: 40,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          {title}
        </h2>
      </FadeIn>
      <div style={{ display: "flex", gap: 32 }}>
        {items.map((item, i) => (
          <FadeIn key={item} delay={15 + i * 12}>
            <div
              style={{
                backgroundColor: `${pillarColors[i]}22`,
                border: `3px solid ${pillarColors[i]}`,
                borderRadius: 16,
                padding: "32px 48px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: pillarColors[i],
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {item}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function CTASlide({
  title,
  subtitle,
  cta,
}: {
  title: string;
  subtitle: string;
  cta: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = interpolate(
    frame % (fps * 2),
    [0, fps, fps * 2],
    [1, 1.05, 1],
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <FadeIn>
        <p
          style={{
            color: COLORS.cyan,
            fontSize: 22,
            fontWeight: 600,
            textAlign: "center",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {title}
        </p>
      </FadeIn>
      <FadeIn delay={10}>
        <h2
          style={{
            color: COLORS.white,
            fontSize: 48,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          {subtitle}
        </h2>
      </FadeIn>
      <FadeIn delay={20}>
        <div
          style={{
            transform: `scale(${pulse})`,
            backgroundColor: COLORS.green,
            padding: "20px 48px",
            borderRadius: 12,
          }}
        >
          <p
            style={{
              color: COLORS.navyDark,
              fontSize: 24,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {cta}
          </p>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
}

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
