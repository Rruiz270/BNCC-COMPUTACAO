import { Resend } from "resend";

const MEET_LINK = "https://meet.google.com/bft-fgvm-pra";
const MEET_PHONE = "+55 11 4935-1293";
const MEET_PIN = "655 173 381#";

export async function sendConfirmationEmail(to: string, nome: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping confirmation email");
    return { success: false, error: "Email service not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Instituto i10 <onboarding@resend.dev>",
      to,
      subject: "Inscrição Confirmada — BNCC Computação 2026 | Instituto i10",
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <!-- Header -->
    <div style="background:#0A2463;border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
      <h1 style="color:#00E5A0;font-size:28px;margin:0 0 4px;">i10</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;letter-spacing:1px;">Instituto</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:32px 24px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
      <h2 style="color:#0A2463;font-size:22px;margin:0 0 8px;">Inscrição confirmada!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Olá, <strong>${nome}</strong>! Sua vaga no webinar <strong>BNCC Computação 2026</strong> está garantida.
      </p>

      <!-- Event Details Card -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
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
            <td style="padding:6px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Duração</td>
            <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">2 horas</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Formato</td>
            <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">Google Meet (ao vivo)</td>
          </tr>
        </table>
      </div>

      <!-- Meet Link Button -->
      <div style="text-align:center;margin-bottom:24px;">
        <a href="${MEET_LINK}" style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;">
          Entrar no Google Meet
        </a>
      </div>

      <!-- Alternative access -->
      <div style="background:#f0fdfa;border:1px solid #00B4D830;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="color:#475569;font-size:13px;margin:0 0 8px;font-weight:600;">Acesso alternativo por telefone:</p>
        <p style="color:#475569;font-size:13px;margin:0;">
          Disque: <strong>${MEET_PHONE}</strong><br>
          PIN: <strong>${MEET_PIN}</strong>
        </p>
      </div>

      <!-- What you'll learn -->
      <h3 style="color:#0A2463;font-size:16px;margin:0 0 12px;">O que você vai aprender:</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 12px;background:#0A246308;border-radius:6px;margin-bottom:4px;">
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
            <span style="color:#475569;font-size:13px;">Como acessar FUNDEB, PDDE e outras fontes</span>
          </td>
        </tr>
        <tr><td style="height:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#0A246308;border-radius:6px;">
            <span style="color:#00B4D8;font-weight:700;font-size:13px;">APLICAÇÃO</span>
            <span style="color:#94a3b8;font-size:12px;"> — 35 min</span><br>
            <span style="color:#475569;font-size:13px;">Plano de implementação em 90 dias</span>
          </td>
        </tr>
      </table>

      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
        Guarde este e-mail — o link do Google Meet é o mesmo para o dia do evento. Recomendamos entrar 5 minutos antes do início.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#061840;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0 0 4px;font-style:italic;">
        Orquestrando o Futuro da Educação Pública
      </p>
      <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">
        © 2026 Instituto i10. Todos os direitos reservados.
      </p>
    </div>

  </div>
</body>
</html>
      `.trim(),
    });

    return { success: true };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Falha ao enviar e-mail de confirmação" };
  }
}
