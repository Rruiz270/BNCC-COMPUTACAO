import { prisma } from "./db";
import { createTransporter, wrapEmailLayout } from "./email";
import type { Reminder } from "./email-reminders";

const BATCH_SIZE = 20;
const BATCH_DELAY_MS = 2000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface SendResult {
  reminderId: string;
  totalSent: number;
  totalFailed: number;
  alreadySent: boolean;
}

export async function sendReminderToAll(
  reminder: Reminder,
  options: { force?: boolean } = {}
): Promise<SendResult> {
  // Check if already sent (unless forced)
  if (!options.force) {
    const existing = await prisma.emailLembrete.findUnique({
      where: { reminderId: reminder.id },
    });
    if (existing) {
      return {
        reminderId: reminder.id,
        totalSent: existing.totalSent,
        totalFailed: existing.totalFailed,
        alreadySent: true,
      };
    }
  }

  const transporter = createTransporter();
  const user = process.env.GMAIL_USER;

  if (!transporter || !user) {
    throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD not configured");
  }

  // Get unique emails from all subscribers
  const subscribers = await prisma.inscricao.findMany({
    select: { email: true, nome: true },
    orderBy: { createdAt: "asc" },
  });

  // Deduplicate by email (keep first occurrence with name)
  const seen = new Map<string, string>();
  for (const sub of subscribers) {
    const emailLower = sub.email.toLowerCase().trim();
    if (!seen.has(emailLower)) {
      seen.set(emailLower, sub.nome);
    }
  }

  const uniqueSubscribers = Array.from(seen.entries()).map(([email, nome]) => ({
    email,
    nome,
  }));

  let totalSent = 0;
  let totalFailed = 0;

  // Send in batches
  for (let i = 0; i < uniqueSubscribers.length; i += BATCH_SIZE) {
    const batch = uniqueSubscribers.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map(async ({ email }) => {
        await transporter.sendMail({
          from: `Instituto i10 <${user}>`,
          to: email,
          subject: reminder.subject,
          html: wrapEmailLayout(reminder.bodyHtml),
        });
      })
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        totalSent++;
      } else {
        totalFailed++;
        console.error("Failed to send:", result.reason);
      }
    }

    // Delay between batches (skip after last batch)
    if (i + BATCH_SIZE < uniqueSubscribers.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  // Record result in database
  await prisma.emailLembrete.upsert({
    where: { reminderId: reminder.id },
    create: {
      reminderId: reminder.id,
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

  return {
    reminderId: reminder.id,
    totalSent,
    totalFailed,
    alreadySent: false,
  };
}
