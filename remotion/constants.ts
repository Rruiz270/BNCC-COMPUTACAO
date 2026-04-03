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
    title: "BNCC Computação 2026",
    subtitle: "Sua Rede Está Pronta?",
  },
  {
    type: "stat" as const,
    value: "2.5%",
    label: "do FUNDEB em risco",
    description: "Redes que não implementarem\nperdem recursos essenciais",
  },
  {
    type: "stat" as const,
    value: "70%",
    label: "das redes ainda não implementaram",
    description: "A maioria dos municípios\nestá atrasada",
  },
  {
    type: "stat" as const,
    value: "2026",
    label: "é o prazo final",
    description: "Redes precisam se adequar\nantes do fim do ano letivo",
  },
  {
    type: "pillars" as const,
    title: "Em 2 horas você vai dominar",
    items: ["REGRAS", "RECURSOS", "APLICAÇÃO"],
  },
  {
    type: "cta" as const,
    title: "Webinar Gratuito",
    subtitle: "15 de Abril, 2026 — 17h",
    cta: "Inscreva-se Agora",
  },
];
