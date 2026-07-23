<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BNCC-COMPUTACAO

Site de captação de leads e automação de e-mails do webinar de Computação/BNCC do Instituto i10: página de inscrição, funil pós-webinar, painel admin de inscritos e disparos automáticos de lembretes por cron.

## Stack

- **Linguagem:** TypeScript (`strict: true`).
- **Framework:** Next.js 16.2.2 (App Router) + React 19.2.4.
- **Banco:** PostgreSQL (Neon serverless) via Prisma 7.6 com adapter `@prisma/adapter-neon`. Client gerado em `lib/generated/prisma`.
- **E-mail:** Resend (`resend`) e Nodemailer.
- **Vídeo:** Remotion 4.x (`remotion`, `@remotion/player`).
- **Estilo:** Tailwind CSS v4 (via `@tailwindcss/postcss`).
- **Deploy:** Vercel (config em `vercel.json`, framework `nextjs`, com crons).
- **Package manager:** npm (`package-lock.json`).

## Comandos

- `npm run dev` — servidor de desenvolvimento (`next dev`, porta 3000).
- `npm run build` — build de produção (`next build`).
- `npm start` — sobe o build (`next start`).
- `npm run lint` — ESLint (`eslint`, config em `eslint.config.mjs` + `eslint-config-next`).
- `npm run send-reminder` — dispara lembrete manualmente (`tsx scripts/send-reminder.ts`).
- `postinstall` roda `prisma generate` automaticamente. Não há script de testes.

## Estrutura

- `app/` — App Router. Páginas de inscrição/pós-webinar e API:
  - `app/api/subscribe/route.ts` — cadastro de inscritos.
  - `app/api/pos-webinar/route.ts` — funil pós-webinar / download de relatório.
  - `app/api/admin/subscribers/route.ts` — listagem admin (protegida por senha).
  - `app/api/cron/send-reminders/route.ts` — endpoint chamado pelos crons do Vercel.
- `lib/` — infra: `db.ts` (Prisma/Neon), `email*.ts` (envio e lembretes), `validation.ts` (Zod), `constants.ts`, `airtable.ts`.
- `prisma/schema.prisma` — modelos `Inscricao`, `ReportDownload`, `EmailLembrete` (tabelas `inscricoes`, `report_downloads`, `email_lembretes`). Migrations em `prisma/migrations`.
- `scripts/` — scripts `tsx` de envio/preview/contagem de e-mails.
- `remotion/`, `curso-bncc-computacao/`, `guia-implementacao-bncc/`, `pos-webinar/`, `components/`, `public/`.

## Convenções de código

- TypeScript estrito; validação de entrada com **Zod** (`lib/validation.ts`).
- ESLint flat config (`eslint.config.mjs`) estendendo `eslint-config-next`. Rode `npm run lint` antes de commitar.
- Tailwind v4 (sem `tailwind.config.js` tradicional — configuração via PostCSS).
- Acesso a banco sempre pelo client Prisma exportado em `lib/db.ts`; não instancie `PrismaClient` avulso.
- Ler o guia de versão em `node_modules/next/dist/docs/` antes de mexer em APIs do Next.

## Variáveis de ambiente

Copie `.env.local.example` para `.env.local`. Nomes (nunca commitar valores):

- `DATABASE_URL` — Postgres/Neon.
- `ADMIN_PASSWORD` — protege `/api/admin/subscribers`.
- `RESEND_API_KEY` — envio via Resend.
- `EMAIL_FROM` — remetente exibido.

Em produção, configure as mesmas variáveis no dashboard do **Vercel** (Project Settings → Environment Variables).

## CI/CD & Deploy

- **Deploy:** Vercel com auto-deploy da `main` (`buildCommand: npm run build`, `outputDirectory: .next`).
- **Crons (Vercel):** `/api/cron/send-reminders` roda em `0 12,13 * * *` e `50 19 15 4 *`. O endpoint de cron deve validar o segredo/origem antes de disparar e-mails.
- **CI:** não há GitHub Actions. Recomendado adicionar workflow mínimo em PR: `npm ci` → `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Boas práticas de PR

- Branches: `feat/…`, `fix/…`, `chore/…`; commits em **Conventional Commits**.
- PRs pequenos e focados; ≥1 review; **squash merge**; `main` sempre deployável.
- Checklist: build passa, lint limpo, sem segredos no diff, migrations Prisma acompanhadas de estratégia de rollback, screenshots quando mudar UI.
- Ao alterar `schema.prisma`, gerar migration (`prisma migrate`) e revisar o SQL.

## Testes

- Não há suíte automatizada. Para fluxos de e-mail, use os scripts de preview (`scripts/preview-*.ts`) antes de qualquer envio real.
- Recomendação mínima: testes de unidade para `lib/validation.ts` e um smoke test das rotas de API (ex.: Vitest).

## Segurança & dados

- **Nunca** commitar `.env*` (já ignorado no `.gitignore`).
- Dados pessoais de inscritos (nome, e-mail, telefone, município) → **LGPD**: coletar consentimento (`aceita_atualizacoes`), minimizar exposição e proteger o painel admin.
- Endpoints de cron e admin exigem segredo/senha; nunca deixar abertos.
- Revisar dependências periodicamente (`npm audit`).

## Gotchas

- Prisma client gera em `lib/generated/prisma` (output custom) — depende do `postinstall`; se sumir, rode `prisma generate`.
- Neon é serverless: usar o adapter `@prisma/adapter-neon`, não conexão TCP direta em ambiente edge.
- Scripts em `scripts/` disparam e-mails reais via Resend — confirme o alvo e use os `preview-*` antes.
- Tailwind v4 não usa `tailwind.config.js`; ajustes vão pela pipeline PostCSS.
