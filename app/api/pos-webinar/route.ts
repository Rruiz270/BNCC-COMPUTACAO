import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createTransporter, wrapEmailLayout } from "@/lib/email";

const MUNICIPIOS_PERMITIDOS = [
  "Araci",
  "Araraquara",
  "Araucária",
  "Barcelos",
  "Belo Horizonte",
  "Borborema",
  "Colômbia",
  "Cruzmaltina",
  "Curitiba",
  "Douradoquara",
  "Ereré",
  "Japurá",
  "Jaguaruana",
  "Jundiaí",
  "Maragogi",
  "Mariana",
  "Muqui",
  "Novo Horizonte",
  "Onda Verde",
  "Pernambuco",
  "Piên",
  "Prata",
  "Redentora",
  "Santa Branca",
  "Santana de Parnaíba",
  "São José do Rio Preto",
  "São Paulo",
  "Sobral",
  "Sorocaba",
  "Uruburetama",
];

export async function GET() {
  return NextResponse.json({ municipios: MUNICIPIOS_PERMITIDOS });
}

function normalizeTelefone(tel: string): string {
  return tel.replace(/\D/g, "");
}

const MUNICIPIO_SLUG: Record<string, string> = {
  "Araci": "araci", "Araraquara": "araraquara", "Araucária": "araucaria",
  "Barcelos": "barcelos", "Belo Horizonte": "belo-horizonte", "Borborema": "borborema",
  "Colômbia": "colombia", "Cruzmaltina": "cruzmaltina", "Curitiba": "curitiba",
  "Douradoquara": "douradoquara", "Ereré": "erere", "Jaguaruana": "jaguaruana",
  "Japurá": "japura", "Jundiaí": "jundiai", "Maragogi": "maragogi",
  "Mariana": "mariana", "Muqui": "muqui", "Novo Horizonte": "novo-horizonte",
  "Onda Verde": "onda-verde", "Piên": "pien", "Prata": "prata", "Redentora": "redentora",
  "Santa Branca": "santa-branca", "Santana de Parnaíba": "santana-de-parnaiba",
  "São José do Rio Preto": "sao-jose-do-rio-preto", "São Paulo": "sao-paulo",
  "Sobral": "sobral", "Sorocaba": "sorocaba", "Uruburetama": "uruburetama",
};

function buildReportEmail(nome: string, municipio: string): string {
  const primeiroNome = (nome || "").trim().split(/\s+/)[0] || "educador(a)";
  const baseUrl = "https://www.institutoi10.com.br";
  const guiaUrl = `${baseUrl}/bncc/guia-implementacao-bncc/index.html`;
  const slug = MUNICIPIO_SLUG[municipio] || municipio.toLowerCase().replace(/\s+/g, "-");
  const reportUrl = `${baseUrl}/bncc/fundeb-reports/${slug}.pdf`;
  const instagramUrl = "https://www.instagram.com/institutoi10/";

  const bodyHtml = `
    <h2 style="color:#0A2463;font-size:24px;margin:0 0 12px;">
      ${primeiroNome}, aqui estão seus materiais exclusivos!
    </h2>

    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Obrigado por participar do <strong>Webinar BNCC Computação 2026</strong>.
      Conforme prometido, seguem seus materiais personalizados para
      <strong>${municipio}</strong>.
    </p>

    <!-- Alerta FUNDEB -->
    <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#991B1B;font-size:15px;margin:0;line-height:1.6;font-weight:600;">
        Atenção: redes que não implementarem a BNCC Computação podem perder
        até 2,5% do FUNDEB (complementação VAAR). Para ${municipio}, isso pode
        representar centenas de milhares de reais por ano.
      </p>
    </div>

    <!-- Material 1: Guia -->
    <div style="background:#F0FDF4;border:1px solid #22C55E40;border-radius:12px;padding:20px;margin:0 0 16px;">
      <p style="color:#166534;font-size:12px;margin:0 0 6px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
        Material 1
      </p>
      <p style="color:#166534;font-size:16px;margin:0 0 8px;font-weight:700;">
        Guia Completo de Implementação BNCC Computação
      </p>
      <p style="color:#166534;font-size:14px;margin:0 0 16px;line-height:1.6;">
        O documento mais completo do mercado para secretarias municipais.
        Passo a passo, fontes de recurso, checklist de conformidade e plano de ação.
      </p>
      <div style="text-align:center;">
        <a href="${guiaUrl}"
           style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:15px;padding:12px 32px;border-radius:8px;text-decoration:none;">
          Acessar Guia Completo
        </a>
      </div>
    </div>

    <!-- Material 2: Relatório FUNDEB -->
    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#1E40AF;font-size:12px;margin:0 0 6px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
        Material 2 — Exclusivo para ${municipio}
      </p>
      <p style="color:#1E40AF;font-size:16px;margin:0 0 8px;font-weight:700;">
        Relatório FUNDEB Personalizado
      </p>
      <p style="color:#1E40AF;font-size:14px;margin:0 0 16px;line-height:1.6;">
        Relatório exclusivo de <strong>${municipio}</strong> com diagnóstico da rede,
        cenários de impacto VAAR e oportunidades de captação de recursos federais.
      </p>
      <div style="text-align:center;">
        <a href="${reportUrl}"
           style="display:inline-block;background:#1E40AF;color:#ffffff;font-weight:700;font-size:15px;padding:12px 32px;border-radius:8px;text-decoration:none;">
          Baixar Relatório FUNDEB — ${municipio}
        </a>
      </div>
    </div>

    <!-- O que contém o guia -->
    <h3 style="color:#0A2463;font-size:17px;margin:0 0 12px;">
      O que você encontra no Guia:
    </h3>
    <ul style="color:#475569;font-size:14px;line-height:2.0;margin:0 0 24px;padding-left:20px;">
      <li><strong style="color:#0A2463;">Checklist de Conformidade</strong> — 69 itens em 6 dimensões</li>
      <li><strong style="color:#0A2463;">Plano Municipal de Implementação</strong> — modelo pronto para personalizar</li>
      <li><strong style="color:#0A2463;">Guia de Fontes de Recursos</strong> — FUNDEB, PDDE, PIEC, Encomenda Tecnológica</li>
      <li><strong style="color:#0A2463;">Autodiagnóstico de Prontidão</strong> — avalie sua rede em minutos</li>
      <li><strong style="color:#0A2463;">Computação Desplugada</strong> — atividades sem computador para começar já</li>
    </ul>

    <!-- CTA Consultoria -->
    <div style="background:linear-gradient(135deg,#0A2463 0%,#00B4D8 100%);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#ffffff;font-size:18px;margin:0 0 10px;">
        Quer acelerar a implementação em ${municipio}?
      </h3>
      <p style="color:rgba(255,255,255,0.85);font-size:14px;line-height:1.7;margin:0 0 16px;">
        O Instituto i10 oferece <strong>consultoria personalizada</strong>:
        diagnóstico completo, plano sob medida, formação docente, plataforma
        de compliance VAAR e apoio na captação de FUNDEB, PDDE e PIEC.
      </p>
      <div style="text-align:center;">
        <a href="mailto:institutoi10.org@gmail.com?subject=Consultoria%20BNCC%20—%20${encodeURIComponent(municipio)}"
           style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
          Quero saber mais sobre a consultoria
        </a>
      </div>
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:14px 0 0;text-align:center;">
        institutoi10.org@gmail.com
      </p>
    </div>

    <!-- Instagram -->
    <div style="background:linear-gradient(135deg,#0A2463 0%,#061840 100%);border-radius:12px;padding:24px;margin:28px 0;text-align:center;">
      <p style="color:#00E5A0;font-size:12px;margin:0 0 8px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
        Continue conosco
      </p>
      <h3 style="color:#ffffff;font-size:20px;margin:0 0 12px;">
        Siga o Instituto i10 no Instagram
      </h3>
      <p style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.6;margin:0 0 20px;">
        Conteúdo semanal sobre BNCC, FUNDEB, IA na educação e inovação
        para a gestão pública.
      </p>
      <a href="${instagramUrl}"
         style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Seguir @institutoi10
      </a>
    </div>

    <!-- Fechamento -->
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:20px 0 8px;">
      Não deixe ${municipio} ficar para trás. O prazo é 2026 e quem se move
      primeiro capta mais.
    </p>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Um forte abraço,<br>
      <strong style="color:#0A2463;">Equipe Instituto i10</strong><br>
      <span style="color:#94a3b8;font-size:13px;">Orquestrando o Futuro da Educação Pública</span>
    </p>
    <p style="color:#94a3b8;font-size:12px;line-height:1.5;margin:24px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">
      Você está recebendo este e-mail porque solicitou os materiais exclusivos
      do Webinar BNCC Computação 2026. Dúvidas? institutoi10.org@gmail.com
    </p>`;

  return wrapEmailLayout(bodyHtml);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefone, municipio } = body;

    if (!nome || !email || !telefone || !municipio) {
      return NextResponse.json(
        { success: false, error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();
    const telNorm = normalizeTelefone(telefone);

    if (telNorm.length < 10) {
      return NextResponse.json(
        { success: false, error: "Telefone inválido. Informe DDD + número." },
        { status: 400 }
      );
    }

    if (!MUNICIPIOS_PERMITIDOS.includes(municipio)) {
      return NextResponse.json(
        { success: false, error: "Município não disponível para download." },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.reportDownload.findUnique({
      where: { email: emailNorm },
    });
    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          error: `Este e-mail já solicitou o relatório de ${existingEmail.municipio}. Cada participante pode solicitar apenas 1 relatório.`,
        },
        { status: 409 }
      );
    }

    const existingTel = await prisma.reportDownload.findUnique({
      where: { telefone: telNorm },
    });
    if (existingTel) {
      return NextResponse.json(
        {
          success: false,
          error: `Este telefone já foi usado para solicitar o relatório de ${existingTel.municipio}. Cada participante pode solicitar apenas 1 relatório.`,
        },
        { status: 409 }
      );
    }

    await prisma.reportDownload.create({
      data: {
        nome: nome.trim(),
        email: emailNorm,
        telefone: telNorm,
        municipio,
      },
    });

    const transporter = createTransporter();
    const user = process.env.GMAIL_USER;

    if (transporter && user) {
      const html = buildReportEmail(nome, municipio);
      await transporter.sendMail({
        from: `Instituto i10 <${user}>`,
        to: emailNorm,
        subject: `Seus materiais BNCC Computação — ${municipio} | Instituto i10`,
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("pos-webinar error:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno. Tente novamente." },
      { status: 500 }
    );
  }
}
