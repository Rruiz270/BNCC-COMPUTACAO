/**
 * Dispara o e-mail de agradecimento pós-webinar (15/Abr/2026) para
 * os inscritos únicos e válidos via Gmail SMTP.
 *
 * - Filtra entradas de teste (test@, @example.com, @teste)
 * - Deduplica por email (lowercase/trim)
 * - Personaliza pelo primeiro nome
 * - Checkpoint em data/thank-you-progress.json (resume-safe)
 * - Registra o envio em email_lembretes (reminderId = "post_webinar_thank_you")
 *
 * Uso:
 *   npx tsx --env-file=.env.local scripts/send-agradecimento.ts --test
 *   npx tsx --env-file=.env.local scripts/send-agradecimento.ts --dry
 *   npx tsx --env-file=.env.local scripts/send-agradecimento.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { prisma } from "../lib/db";
import { createTransporter } from "../lib/email";
import { buildThankYouHtml, thankYouSubject } from "./preview-agradecimento";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const PROGRESS_FILE = join(DATA_DIR, "thank-you-progress.json");

const REMINDER_ID = "post_webinar_thank_you";
const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 5000;
const PER_EMAIL_DELAY_MS = 1000;

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
    const html = buildThankYouHtml("Raphael (TESTE)");
    await transporter.sendMail({
      from: `Instituto i10 <${user}>`,
      to: user,
      subject: `[TESTE] ${thankYouSubject}`,
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
          subject: thankYouSubject,
          html: buildThankYouHtml(sub.nome),
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
