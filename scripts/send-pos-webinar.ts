/**
 * Dispara o e-mail pós-webinar com materiais exclusivos para os
 * inscritos únicos e válidos via Gmail SMTP.
 *
 * - Filtra entradas de teste (test@, @example.com, @teste)
 * - Deduplica por email (lowercase/trim)
 * - Personaliza pelo primeiro nome
 * - Checkpoint em data/pos-webinar-progress.json (resume-safe)
 * - Registra o envio em email_lembretes (reminderId = "post_webinar_materials")
 *
 * Uso:
 *   npx tsx --env-file=.env.local scripts/send-pos-webinar.ts --test
 *   npx tsx --env-file=.env.local scripts/send-pos-webinar.ts --dry
 *   npx tsx --env-file=.env.local scripts/send-pos-webinar.ts
 *   npx tsx --env-file=.env.local scripts/send-pos-webinar.ts --force
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { prisma } from "../lib/db";
import { createTransporter, wrapEmailLayout } from "../lib/email";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const PROGRESS_FILE = join(DATA_DIR, "pos-webinar-progress.json");

const REMINDER_ID = "post_webinar_materials";
const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 5000;
const PER_EMAIL_DELAY_MS = 1000;

const LANDING_PAGE_URL = "https://bncc.institutoi10.com.br/pos-webinar";
const INSTAGRAM_URL = "https://www.instagram.com/institutoi10/";

const EMAIL_SUBJECT =
  "Seus materiais exclusivos estão prontos — BNCC Computação 2026 | Instituto i10";

const TEST_PATTERNS = [
  /@test\./i,
  /^test@/i,
  /@example\./i,
  /@teste\./i,
  /^teste@/i,
];

interface Progress {
  sent: string[];
  failed: { email: string; error: string }[];
  startedAt: string;
  lastUpdate: string;
}

function loadProgress(): Progress {
  if (existsSync(PROGRESS_FILE)) {
    return JSON.parse(readFileSync(PROGRESS_FILE, "utf-8"));
  }
  return {
    sent: [],
    failed: [],
    startedAt: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
  };
}

function saveProgress(p: Progress) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  p.lastUpdate = new Date().toISOString();
  writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2), "utf-8");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Email HTML builder ──────────────────────────────────────────────
export function buildPosWebinarHtml(nome: string): string {
  const primeiroNome = (nome || "").trim().split(/\s+/)[0] || "educador(a)";

  const bodyHtml = `
      <h2 style="color:#0A2463;font-size:24px;margin:0 0 12px;">
        ${primeiroNome}, seus materiais exclusivos estão prontos!
      </h2>

      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
        Conforme prometido durante o <strong>Webinar BNCC Computação 2026</strong>,
        preparamos um pacote completo de ferramentas para ajudar sua rede municipal
        na implementação — e garantir que <strong>nenhum recurso fique na mesa</strong>.
      </p>

      <!-- Alerta vermelho urgência -->
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:12px;padding:20px;margin:0 0 24px;">
        <p style="color:#991B1B;font-size:15px;margin:0;line-height:1.6;font-weight:600;">
          Atenção: redes que não implementarem a BNCC Computação podem perder
          2,5% do FUNDEB (complementação VAAR). Isso é dinheiro que você
          <strong>já recebe</strong> e pode deixar de receber.
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center;margin:0 0 28px;">
        <a href="${LANDING_PAGE_URL}"
           style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:17px;padding:16px 44px;border-radius:8px;text-decoration:none;">
          Acessar Meus Materiais Exclusivos
        </a>
      </div>

      <!-- Lista de materiais -->
      <h3 style="color:#0A2463;font-size:17px;margin:0 0 12px;">
        O que você vai encontrar:
      </h3>

      <ul style="color:#475569;font-size:14px;line-height:2.0;margin:0 0 24px;padding-left:20px;">
        <li>
          <strong style="color:#0A2463;">Guia Completo de Implementação</strong>
          — o documento mais completo do mercado para secretarias municipais
        </li>
        <li>
          <strong style="color:#0A2463;">Checklist de Conformidade</strong>
          — 69 itens em 6 dimensões para verificar sua rede
        </li>
        <li>
          <strong style="color:#0A2463;">Modelo de Plano Municipal</strong>
          — pronto para personalizar com diagnóstico, metas e orçamento
        </li>
        <li>
          <strong style="color:#0A2463;">Guia de Fontes de Recursos</strong>
          — FUNDEB, PDDE, PIEC, Encomenda Tecnológica e mais
        </li>
        <li>
          <strong style="color:#0A2463;">Autodiagnóstico de Prontidão</strong>
          — descubra o nível da sua rede em minutos
        </li>
      </ul>

      <!-- Relatório FUNDEB -->
      <div style="background:#F0FDF4;border:1px solid #22C55E40;border-radius:12px;padding:20px;margin:0 0 28px;">
        <p style="color:#166534;font-size:15px;margin:0 0 8px;font-weight:700;">
          Bônus: Relatório FUNDEB Personalizado
        </p>
        <p style="color:#166534;font-size:14px;margin:0;line-height:1.6;">
          Na sua área exclusiva, você pode solicitar um relatório sob medida
          para o seu município com cenários e oportunidades de captação.
          <strong>Limitado a 1 por participante.</strong>
        </p>
      </div>

      <!-- CTA Button 2 -->
      <div style="text-align:center;margin:0 0 28px;">
        <a href="${LANDING_PAGE_URL}#relatorio"
           style="display:inline-block;background:#0A2463;color:#ffffff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:8px;text-decoration:none;">
          Solicitar Relatório FUNDEB
        </a>
      </div>

      <!-- CTA Consultoria -->
      <div style="background:linear-gradient(135deg,#0A2463 0%,#00B4D8 100%);border-radius:12px;padding:24px;margin:28px 0;">
        <h3 style="color:#ffffff;font-size:18px;margin:0 0 10px;">
          Quer captar ainda mais recursos para sua rede?
        </h3>
        <p style="color:rgba(255,255,255,0.85);font-size:14px;line-height:1.7;margin:0 0 16px;">
          O Instituto i10 oferece <strong>consultoria personalizada</strong> para
          municípios que querem acelerar a implementação e maximizar a captação
          de FUNDEB, PDDE, PIEC e Encomenda Tecnológica.
        </p>
        <p style="color:rgba(255,255,255,0.85);font-size:14px;line-height:1.7;margin:0 0 16px;">
          Diagnóstico completo, plano sob medida, formação docente e plataforma
          de compliance VAAR — tudo integrado.
        </p>
        <div style="text-align:center;">
          <a href="mailto:institutoi10.org@gmail.com?subject=Consultoria%20BNCC%20Computação%20—%20Quero%20saber%20mais"
             style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Quero saber mais sobre a consultoria
          </a>
        </div>
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:14px 0 0;text-align:center;">
          institutoi10.org@gmail.com
        </p>
      </div>

      <!-- Instagram CTA -->
      <div style="background:linear-gradient(135deg,#0A2463 0%,#061840 100%);border-radius:12px;padding:24px;margin:28px 0;text-align:center;">
        <p style="color:#00E5A0;font-size:12px;margin:0 0 8px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
          Continue conosco
        </p>
        <h3 style="color:#ffffff;font-size:20px;margin:0 0 12px;">
          Siga o Instituto i10 no Instagram
        </h3>
        <p style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.6;margin:0 0 20px;">
          Conteúdo semanal sobre BNCC, FUNDEB, IA na educação e inovação para a
          gestão pública — direto no seu feed.
        </p>
        <a href="${INSTAGRAM_URL}"
           style="display:inline-block;background:#00E5A0;color:#061840;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
          Seguir @institutoi10
        </a>
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:14px 0 0;">
          instagram.com/institutoi10
        </p>
      </div>

      <!-- Fechamento -->
      <p style="color:#475569;font-size:15px;line-height:1.7;margin:20px 0 8px;">
        Não deixe sua rede ficar para trás. O prazo é 2026 e quem se move
        primeiro capta mais.
      </p>

      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 24px;">
        Um forte abraço,<br>
        <strong style="color:#0A2463;">Equipe Instituto i10</strong><br>
        <span style="color:#94a3b8;font-size:13px;">Orquestrando o Futuro da Educação Pública</span>
      </p>

      <p style="color:#94a3b8;font-size:12px;line-height:1.5;margin:24px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">
        Você está recebendo este e-mail porque se inscreveu no Webinar BNCC
        Computação 2026 do Instituto i10. Dúvidas? Escreva para institutoi10.org@gmail.com.
      </p>`;

  return wrapEmailLayout(bodyHtml);
}

// ── Subscriber loader ───────────────────────────────────────────────
async function loadUniqueSubscribers() {
  const rows = await prisma.inscricao.findMany({
    select: { email: true, nome: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  const seen = new Map<string, { email: string; nome: string }>();
  let tests = 0;
  let invalid = 0;
  for (const r of rows) {
    const key = (r.email || "").toLowerCase().trim();
    if (!key.includes("@") || !key.includes(".")) {
      invalid++;
      continue;
    }
    if (TEST_PATTERNS.some((p) => p.test(key))) {
      tests++;
      continue;
    }
    if (!seen.has(key)) seen.set(key, { email: key, nome: r.nome });
  }
  return {
    totalRows: rows.length,
    invalid,
    tests,
    unique: Array.from(seen.values()),
  };
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const isTest = args.includes("--test");
  const isDry = args.includes("--dry");

  const transporter = createTransporter();
  const user = process.env.GMAIL_USER;
  if (!transporter || !user) {
    throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD não configurados em .env.local");
  }

  // ── --test: envia 1 email para o próprio remetente ──────────────
  if (isTest) {
    console.log(`Modo TESTE — enviando 1 email para ${user}`);
    const html = buildPosWebinarHtml("Raphael (TESTE)");
    await transporter.sendMail({
      from: `Instituto i10 <${user}>`,
      to: user,
      subject: `[TESTE] ${EMAIL_SUBJECT}`,
      html,
    });
    console.log("Email de teste enviado.");
    await prisma.$disconnect();
    return;
  }

  // ── Carrega inscritos ────────────────────────────────────────────
  const { totalRows, invalid, tests, unique } = await loadUniqueSubscribers();
  console.log(`Banco: ${totalRows} linhas | inválidos: ${invalid} | testes: ${tests}`);
  console.log(`Destinatários únicos: ${unique.length}`);

  // ── Checa se já foi disparado (email_lembretes) ──────────────────
  const existing = await prisma.emailLembrete.findUnique({
    where: { reminderId: REMINDER_ID },
  });
  if (existing && !args.includes("--force")) {
    console.log("");
    console.log(
      `Esse lembrete já foi registrado como enviado em ${existing.sentAt.toISOString()}.`
    );
    console.log(`  Enviados: ${existing.totalSent} | Falhas: ${existing.totalFailed}`);
    console.log("Use --force para re-enviar.");
    await prisma.$disconnect();
    return;
  }

  // ── Dry-run: apenas mostra os destinatários ──────────────────────
  if (isDry) {
    console.log("");
    console.log("--- DRY-RUN (nenhum email será enviado) ---");
    unique.forEach((u, i) =>
      console.log(`${String(i + 1).padStart(3, " ")}. ${u.nome} <${u.email}>`)
    );
    await prisma.$disconnect();
    return;
  }

  // ── Progresso para resume-safe ───────────────────────────────────
  const progress = loadProgress();
  const alreadyDone = new Set([
    ...progress.sent,
    ...progress.failed.map((f) => f.email),
  ]);
  const pending = unique.filter((u) => !alreadyDone.has(u.email));

  console.log("");
  console.log(`Pendentes agora: ${pending.length}`);
  console.log(`Já enviados (progresso anterior): ${progress.sent.length}`);
  console.log(`Falhas anteriores: ${progress.failed.length}`);
  console.log("");

  if (pending.length === 0) {
    console.log("Nada a enviar.");
  }

  let sentNow = 0;
  let failedNow = 0;
  const totalBatches = Math.ceil(pending.length / BATCH_SIZE);

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const batch = pending.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    console.log(`Lote ${batchNum}/${totalBatches} (${batch.length} emails)`);

    for (const sub of batch) {
      try {
        await transporter.sendMail({
          from: `Instituto i10 <${user}>`,
          to: sub.email,
          subject: EMAIL_SUBJECT,
          html: buildPosWebinarHtml(sub.nome),
        });
        progress.sent.push(sub.email);
        sentNow++;
        console.log(`  OK  ${sub.email} (${sub.nome})`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        progress.failed.push({ email: sub.email, error: msg });
        failedNow++;
        console.error(`  FAIL ${sub.email}: ${msg}`);
      }
      saveProgress(progress);
      await sleep(PER_EMAIL_DELAY_MS);
    }

    if (i + BATCH_SIZE < pending.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  // ── Registra no banco ────────────────────────────────────────────
  const totalSent = progress.sent.length;
  const totalFailed = progress.failed.length;
  await prisma.emailLembrete.upsert({
    where: { reminderId: REMINDER_ID },
    create: {
      reminderId: REMINDER_ID,
      totalSent,
      totalFailed,
      status: totalFailed === 0 ? "completed" : "completed_with_errors",
    },
    update: {
      totalSent,
      totalFailed,
      sentAt: new Date(),
      status: totalFailed === 0 ? "completed" : "completed_with_errors",
    },
  });

  console.log("");
  console.log("=== Resumo ===");
  console.log(`Enviados nesta execução: ${sentNow}`);
  console.log(`Falhas nesta execução:  ${failedNow}`);
  console.log(`Total acumulado enviado: ${totalSent}`);
  console.log(`Total acumulado falhas:  ${totalFailed}`);

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("Erro fatal:", err);
  await prisma.$disconnect();
  process.exit(1);
});
