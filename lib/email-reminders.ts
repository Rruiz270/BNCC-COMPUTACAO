import { MEET_LINK, MEET_PHONE, MEET_PIN } from "./email";

export interface Reminder {
  id: string;
  subject: string;
  /** ISO date string YYYY-MM-DD in America/Sao_Paulo */
  date: string;
  /** HH:MM in America/Sao_Paulo */
  time: string;
  bodyHtml: string;
}

const greenButton = (text: string, href: string) => `
  <div style="text-align:center;margin:24px 0;">
    <a href="${href}" style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;">
      ${text}
    </a>
  </div>`;

const eventCard = `
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:20px 0;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:6px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:100px;">Data</td>
        <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">Quarta-feira, 15 de Abril de 2026</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Horário</td>
        <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">17:00 – 19:00 (horário de Brasília)</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Formato</td>
        <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">Google Meet (ao vivo)</td>
      </tr>
    </table>
  </div>`;

const pillarsPreview = `
  <table style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr>
      <td style="padding:8px 12px;background:#0A246308;border-radius:6px;">
        <span style="color:#00B4D8;font-weight:700;font-size:13px;">REGRAS</span>
        <span style="color:#94a3b8;font-size:12px;"> — 40 min</span><br>
        <span style="color:#475569;font-size:13px;">O que a BNCC Computação exige e os prazos legais</span>
      </td>
    </tr>
    <tr><td style="height:4px;"></td></tr>
    <tr>
      <td style="padding:8px 12px;background:#0A246308;border-radius:6px;">
        <span style="color:#00B4D8;font-weight:700;font-size:13px;">RECURSOS</span>
        <span style="color:#94a3b8;font-size:12px;"> — 45 min</span><br>
        <span style="color:#475569;font-size:13px;">Como acessar FUNDEB, PDDE e outras fontes de financiamento</span>
      </td>
    </tr>
    <tr><td style="height:4px;"></td></tr>
    <tr>
      <td style="padding:8px 12px;background:#0A246308;border-radius:6px;">
        <span style="color:#00B4D8;font-weight:700;font-size:13px;">APLICAÇÃO</span>
        <span style="color:#94a3b8;font-size:12px;"> — 35 min</span><br>
        <span style="color:#475569;font-size:13px;">Plano de implementação em 90 dias para sua rede</span>
      </td>
    </tr>
  </table>`;

const phoneAccess = `
  <div style="background:#f0fdfa;border:1px solid #00B4D830;border-radius:8px;padding:16px;margin:16px 0;">
    <p style="color:#475569;font-size:13px;margin:0 0 8px;font-weight:600;">Acesso alternativo por telefone:</p>
    <p style="color:#475569;font-size:13px;margin:0;">
      Disque: <strong>${MEET_PHONE}</strong><br>
      PIN: <strong>${MEET_PIN}</strong>
    </p>
  </div>`;

export const REMINDERS: Reminder[] = [
  // #1 — Seg 07/Abr 09:00 BRT
  {
    id: "week1_monday",
    subject: "O webinar BNCC Computação é na próxima semana! | Instituto i10",
    date: "2026-04-07",
    time: "09:00",
    bodyHtml: `
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 8px;">O webinar é na próxima semana!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Falta <strong>1 semana</strong> para o webinar <strong>BNCC Computação 2026</strong> do Instituto i10.
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Em 2 horas, você vai entender exatamente o que a BNCC Computação exige da sua rede, como acessar os recursos do FUNDEB e PDDE, e sair com um plano de implementação em 90 dias.
      </p>
      ${eventCard}
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>70% das redes municipais ainda não se adequaram.</strong> Não deixe a sua ficar para trás.
      </p>
      ${greenButton("Adicionar à Agenda", MEET_LINK)}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        Guarde este e-mail — enviaremos mais detalhes ao longo da semana.
      </p>`,
  },

  // #2 — Qua 09/Abr 10:00 BRT
  {
    id: "week1_wednesday",
    subject: "Prévia: Os 3 pilares do webinar BNCC Computação | Instituto i10",
    date: "2026-04-09",
    time: "10:00",
    bodyHtml: `
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 8px;">O que você vai aprender no webinar</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Preparamos 2 horas de conteúdo prático dividido em <strong>3 pilares</strong>:
      </p>
      ${pillarsPreview}
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Cada pilar foi pensado para resolver os maiores desafios que secretarias e gestores enfrentam com a implementação da BNCC Computação.
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Ao final, você terá acesso aos <strong>slides, documentos modelo e gravação</strong> por 30 dias.
      </p>
      ${eventCard}
      ${greenButton("Confirmar Presença", MEET_LINK)}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        O webinar será na <strong>quarta-feira, 15 de Abril às 17h</strong>.
      </p>`,
  },

  // #3 — Sex 11/Abr 10:00 BRT
  {
    id: "week1_friday",
    subject: "Semana do webinar BNCC Computação! Você está pronto? | Instituto i10",
    date: "2026-04-11",
    time: "10:00",
    bodyHtml: `
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 8px;">A semana do webinar chegou!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Na próxima <strong>quarta-feira (15/Abr)</strong>, nossos especialistas vão guiar você pela implementação da BNCC Computação.
      </p>
      <div style="background:#FFF7ED;border:1px solid #FB923C40;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#9A3412;font-size:14px;margin:0;font-weight:600;">
          Você sabia? Redes que não implementarem a BNCC Computação em 2026 podem perder até 2,5% dos recursos do FUNDEB.
        </p>
      </div>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Dica:</strong> Convide colegas da secretaria e da coordenação — quanto mais pessoas da sua rede participarem, mais fácil será a implementação.
      </p>
      ${eventCard}
      ${greenButton("Salvar na Agenda", MEET_LINK)}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        Enviaremos mais um lembrete na segunda e terça.
      </p>`,
  },

  // #4 — Seg 14/Abr 09:00 BRT
  {
    id: "week2_monday",
    subject: "É ESTA SEMANA — Webinar BNCC Computação quarta às 17h | Instituto i10",
    date: "2026-04-13",
    time: "09:00",
    bodyHtml: `
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 8px;">É esta semana!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Faltam apenas <strong>2 dias</strong> para o webinar <strong>BNCC Computação 2026</strong>.
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Nossos facilitadores <strong>Emerson Pontes</strong> (Jurídico) e <strong>Bruno Almeida</strong> (Tecnologia) prepararam conteúdo prático e direto ao ponto para você e sua equipe.
      </p>
      ${eventCard}
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Prepare-se:</strong>
      </p>
      <ul style="color:#475569;font-size:14px;line-height:1.8;margin:0 0 16px;padding-left:20px;">
        <li>Teste seu acesso ao Google Meet antecipadamente</li>
        <li>Reserve 2 horas sem interrupções (17h – 19h)</li>
        <li>Tenha papel e caneta para anotar</li>
      </ul>
      ${greenButton("Testar Link do Meet", MEET_LINK)}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        Quarta-feira, 15 de Abril às 17:00 (Brasília).
      </p>`,
  },

  // #5 — Ter 14/Abr 10:00 BRT
  {
    id: "day_before",
    subject: "AMANHÃ às 17h — Webinar BNCC Computação | Instituto i10",
    date: "2026-04-14",
    time: "10:00",
    bodyHtml: `
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 8px;">É amanhã!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <strong>Amanhã, quarta-feira 15 de Abril às 17h</strong>, começa o webinar BNCC Computação 2026.
      </p>
      <div style="background:#EFF6FF;border:1px solid #3B82F640;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#1E40AF;font-size:14px;margin:0;">
          Recomendamos entrar no Google Meet <strong>5 minutos antes</strong> das 17h para garantir que áudio e vídeo estejam funcionando.
        </p>
      </div>
      ${eventCard}
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 8px;">
        <strong>Seu link de acesso:</strong>
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <a href="${MEET_LINK}" style="color:#00B4D8;font-weight:600;">${MEET_LINK}</a>
      </p>
      ${phoneAccess}
      ${greenButton("Entrar no Google Meet (amanhã)", MEET_LINK)}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        Enviaremos um último lembrete amanhã de manhã e 10 minutos antes do início.
      </p>`,
  },

  // #6 — Qua 15/Abr 09:00 BRT
  {
    id: "day_of_morning",
    subject: "HOJE às 17h — Webinar BNCC Computação | Instituto i10",
    date: "2026-04-15",
    time: "09:00",
    bodyHtml: `
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 12px;">
        <span style="color:#00E5A0;">HOJE</span> às 17h!
      </h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        O dia chegou! <strong>Hoje às 17:00</strong> começa o webinar <strong>BNCC Computação 2026</strong>.
      </p>
      <div style="background:#F0FDF4;border:1px solid #22C55E40;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#166534;font-size:14px;margin:0;">
          Em <strong>2 horas de conteúdo prático</strong>, você vai sair com um plano de implementação completo para a sua rede.
        </p>
      </div>
      ${eventCard}
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 8px;">
        <strong>Seu link de acesso:</strong>
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
        <a href="${MEET_LINK}" style="color:#00B4D8;font-weight:600;">${MEET_LINK}</a>
      </p>
      ${phoneAccess}
      ${greenButton("Entrar no Google Meet às 17h", MEET_LINK)}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        Enviaremos um último aviso 10 minutos antes do início.
      </p>`,
  },

  // #7 — Qua 15/Abr 16:50 BRT
  {
    id: "ten_minutes_before",
    subject: "COMEÇA EM 10 MINUTOS — Entre agora! | Instituto i10",
    date: "2026-04-15",
    time: "16:50",
    bodyHtml: `
      <div style="text-align:center;">
        <h2 style="color:#0A2463;font-size:24px;margin:0 0 12px;">
          Começa em <span style="color:#DC2626;">10 MINUTOS!</span>
        </h2>
        <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
          O webinar <strong>BNCC Computação 2026</strong> está prestes a começar.<br>
          Entre agora para garantir seu lugar.
        </p>
        <a href="${MEET_LINK}" style="display:inline-block;background:#DC2626;color:#ffffff;font-weight:700;font-size:18px;padding:16px 40px;border-radius:8px;text-decoration:none;margin-bottom:24px;">
          ENTRAR AGORA
        </a>
        <p style="color:#475569;font-size:14px;line-height:1.6;margin:24px 0 16px;">
          <strong>Link direto:</strong><br>
          <a href="${MEET_LINK}" style="color:#00B4D8;font-weight:600;">${MEET_LINK}</a>
        </p>
      </div>
      ${phoneAccess}
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;text-align:center;">
        17:00 – 19:00 (horário de Brasília) | Google Meet
      </p>`,
  },
];

/**
 * Returns the reminder that should be sent right now based on
 * America/Sao_Paulo timezone. Matches if today's date equals the
 * reminder date and the current hour matches the reminder hour.
 */
export function getCurrentReminder(): Reminder | null {
  const now = new Date();
  const brFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const brTimeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const todayBR = brFormatter.format(now); // YYYY-MM-DD
  const timeBR = brTimeFormatter.format(now); // HH:MM

  const currentHour = parseInt(timeBR.split(":")[0], 10);

  for (const reminder of REMINDERS) {
    if (reminder.date !== todayBR) continue;

    const reminderHour = parseInt(reminder.time.split(":")[0], 10);
    // Match if we're in the same hour as the scheduled time
    if (currentHour === reminderHour) {
      return reminder;
    }
  }

  return null;
}

export function getReminderById(id: string): Reminder | undefined {
  return REMINDERS.find((r) => r.id === id);
}
