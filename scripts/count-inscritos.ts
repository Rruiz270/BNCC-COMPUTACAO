import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { prisma } from "../lib/db";

const TEST_PATTERNS = [
  /@test\./i,
  /^test@/i,
  /@example\./i,
  /@teste\./i,
  /^teste@/i,
];

async function main() {
  const total = await prisma.inscricao.count();
  const rows = await prisma.inscricao.findMany({
    select: { email: true, nome: true, municipio: true, cargo: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  const uniqByEmail = new Map<string, typeof rows[number]>();
  let invalid = 0;
  let testEntries = 0;
  for (const r of rows) {
    const key = (r.email || "").toLowerCase().trim();
    if (!key.includes("@") || !key.includes(".")) {
      invalid++;
      continue;
    }
    if (TEST_PATTERNS.some((p) => p.test(key))) {
      testEntries++;
      continue;
    }
    if (!uniqByEmail.has(key)) uniqByEmail.set(key, r);
  }
  console.log(JSON.stringify({
    totalRows: total,
    invalidEmails: invalid,
    testEntries,
    uniqueValidRealEmails: uniqByEmail.size,
    firstInscritosSample: Array.from(uniqByEmail.values()).slice(0, 5).map(r => ({
      nome: r.nome,
      email: r.email,
      municipio: r.municipio,
      cargo: r.cargo,
    })),
  }, null, 2));
  await prisma.$disconnect();
}

main();
