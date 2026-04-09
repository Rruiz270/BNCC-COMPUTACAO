import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { REMINDERS, getReminderById } from "../lib/email-reminders";
import { sendReminderToAll } from "../lib/email-sender";

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const reminderId = args.find((a) => !a.startsWith("--"));

  // No argument: list all reminders
  if (!reminderId) {
    console.log("\nLembretes de email configurados:\n");
    console.log(
      "ID".padEnd(22) +
        "Data".padEnd(14) +
        "Hora".padEnd(8) +
        "Assunto"
    );
    console.log("-".repeat(80));

    for (const r of REMINDERS) {
      console.log(
        r.id.padEnd(22) +
          r.date.padEnd(14) +
          r.time.padEnd(8) +
          r.subject.slice(0, 50)
      );
    }

    console.log(
      "\nUso: npx tsx scripts/send-reminder.ts <reminder_id> [--force]"
    );
    console.log("  --force  Re-envia mesmo se já foi marcado como enviado\n");
    return;
  }

  // Find the reminder
  const reminder = getReminderById(reminderId);
  if (!reminder) {
    console.error(`Lembrete "${reminderId}" não encontrado.`);
    console.error(
      "IDs válidos:",
      REMINDERS.map((r) => r.id).join(", ")
    );
    process.exit(1);
  }

  console.log(`\nEnviando lembrete: ${reminder.id}`);
  console.log(`Assunto: ${reminder.subject}`);
  console.log(`Data/Hora agendada: ${reminder.date} ${reminder.time} BRT`);
  if (force) console.log("Modo: --force (re-envio habilitado)");
  console.log("");

  try {
    const result = await sendReminderToAll(reminder, { force });

    if (result.alreadySent) {
      console.log(
        `Este lembrete já foi enviado anteriormente (${result.totalSent} enviados, ${result.totalFailed} falhas).`
      );
      console.log("Use --force para re-enviar.");
      return;
    }

    console.log("Resultado:");
    console.log(`  Enviados: ${result.totalSent}`);
    console.log(`  Falhas:   ${result.totalFailed}`);
    console.log("  Status:   Concluído");
  } catch (err) {
    console.error("Erro ao enviar:", err);
    process.exit(1);
  }
}

main();
