export const COLORS = {
  navy: "#0A2463",
  navyDark: "#061840",
  cyan: "#00B4D8",
  green: "#00E5A0",
  white: "#ffffff",
  grayLight: "#f8fafc",
  textDark: "#1e293b",
  textGray: "#475569",
};

export const VIDEO_CONFIG = {
  width: 1280,
  height: 720,
  fps: 30,
  durationInSeconds: 30,
};

export const SLIDES = [
  {
    type: "intro" as const,
    title: "Instituto i10",
    subtitle: "apresenta",
  },
  {
    type: "headline" as const,
    title: "BNCC Computacao 2026",
    subtitle: "Sua Rede Esta Pronta?",
  },
  {
    type: "stat" as const,
    value: "2.5%",
    label: "do FUNDEB em risco",
    description: "Redes que nao implementarem\nperdem recursos essenciais",
  },
  {
    type: "stat" as const,
    value: "70%",
    label: "das redes ainda nao implementaram",
    description: "A maioria dos municipios\nesta atrasada",
  },
  {
    type: "stat" as const,
    value: "1.038",
    label: "escolas em Santa Catarina",
    description: "Ja estao no processo\ncom o Instituto i10",
  },
  {
    type: "pillars" as const,
    title: "Em 2 horas voce vai dominar",
    items: ["REGRAS", "RECURSOS", "APLICACAO"],
  },
  {
    type: "cta" as const,
    title: "Webinar Gratuito",
    subtitle: "15 de Abril, 2026 — 19h",
    cta: "Inscreva-se Agora",
  },
];
