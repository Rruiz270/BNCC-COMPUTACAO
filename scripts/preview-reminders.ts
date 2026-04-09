import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { REMINDERS } from "../lib/email-reminders";
import { createTransporter, wrapEmailLayout } from "../lib/email";

const TARGET_EMAIL = process.argv[2];

if (!TARGET_EMAIL) {
  console.error("Uso: npx tsx scripts/preview-reminders.ts <email>");
  process.exit(1);
}

async function main() {
  const transporter = createTransporter();
  const user = process.env.GMAIL_USER;

  if (!transporter || !user) {
    console.error("GMAIL_USER ou GMAIL_APP_PASSWORD não configurados.");
    process.exit(1);
  }

  for (const reminder of REMINDERS) {
    try {
      await transporter.sendMail({
        from: `Instituto i10 <${user}>`,
        to: TARGET_EMAIL,
        subject: `[PREVIEW ${reminder.id}] ${reminder.subject}`,
        html: wrapEmailLayout(reminder.bodyHtml),
      });
      console.log(`✓ Enviado: ${reminder.id}`);
    } catch (err) {
      console.error(`✗ Falha: ${reminder.id}`, err);
    }

    // 1s entre cada envio
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\nTodos os 7 previews enviados!");
}

main();
