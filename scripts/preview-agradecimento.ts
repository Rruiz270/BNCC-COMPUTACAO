/**
 * Gera o HTML do e-mail de agradecimento pós-webinar (preview).
 * NÃO envia nada — apenas grava um arquivo HTML para visualização.
 *
 * Uso: npx tsx --env-file=.env.local scripts/preview-agradecimento.ts
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { wrapEmailLayout } from "../lib/email";

const INSTAGRAM_URL = "https://www.instagram.com/institutoi10/";

export const thankYouSubject =
  "Obrigado por participar do Webinar BNCC Computação 2026! | Instituto i10";

export function buildThankYouHtml(nome: string): string {
  const primeiroNome = (nome || "").trim().split(/\s+/)[0] || "educador(a)";

  const bodyHtml = `
      <h2 style="color:#0A2463;font-size:24px;margin:0 0 12px;">
        Obrigado por fazer parte dessa jornada, ${primeiroNome}!
      </h2>

      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Ontem, <strong>15 de abril</strong>, vivemos juntos um momento especial: o
        <strong>Webinar BNCC Computação 2026</strong> foi um sucesso — e você foi parte
        fundamental disso. Obrigado pela presença, pelas perguntas e pelo engajamento
        genuíno com um tema que vai transformar a educação das redes municipais
        brasileiras.
      </p>

      <!-- Bloco de destaque: sucesso do evento -->
      <div style="background:#F0FDF4;border:1px solid #22C55E40;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="color:#166534;font-size:14px;margin:0;line-height:1.6;">
          Foram <strong>2 horas intensas</strong> de conteúdo prático, debate e
          construção coletiva. A energia da sala mostrou que há, sim, um movimento
          nacional de gestores comprometidos com a implementação da BNCC Computação —
          e o Instituto i10 tem orgulho de caminhar ao lado de vocês.
        </p>
      </div>

      <!-- Agradecimento nominal aos mediadores -->
      <h3 style="color:#0A2463;font-size:18px;margin:24px 0 12px;">
        Um obrigado especial aos nossos mediadores
      </h3>

      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Este webinar não teria sido possível sem a generosidade e a profundidade
        técnica de duas pessoas que admiramos profundamente:
      </p>

      <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
        <tr>
          <td style="padding:14px 16px;background:#0A246308;border-radius:8px;">
            <p style="color:#0A2463;font-size:15px;margin:0 0 4px;font-weight:700;">
              Emerson Pontes
            </p>
            <p style="color:#475569;font-size:13px;margin:0;line-height:1.5;">
              Pela clareza jurídica com que desdobrou as exigências legais da BNCC
              Computação e os caminhos do FUNDEB — obrigado por traduzir o complexo
              em ação prática.
            </p>
          </td>
        </tr>
        <tr><td style="height:8px;"></td></tr>
        <tr>
          <td style="padding:14px 16px;background:#0A246308;border-radius:8px;">
            <p style="color:#0A2463;font-size:15px;margin:0 0 4px;font-weight:700;">
              Bruno Almeida
            </p>
            <p style="color:#475569;font-size:13px;margin:0;line-height:1.5;">
              Pela visão tecnológica e pedagógica que transformou teoria em plano
              de implementação — obrigado por mostrar que a BNCC Computação cabe na
              realidade das redes municipais.
            </p>
          </td>
        </tr>
      </table>

      <!-- O que vem a seguir -->
      <h3 style="color:#0A2463;font-size:18px;margin:24px 0 12px;">
        E agora, o que vem pela frente?
      </h3>

      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Conforme combinado durante o evento, <strong>você, que participou do webinar</strong>,
        receberá diretamente no seu e-mail nas próximas semanas:
      </p>

      <ul style="color:#475569;font-size:14px;line-height:1.9;margin:0 0 20px;padding-left:20px;">
        <li>
          <strong style="color:#0A2463;">Guia Completo de Implementação BNCC Computação</strong>
          — um material prático e estruturado para orientar sua rede passo a passo.
        </li>
        <li>
          <strong style="color:#0A2463;">Relatório FUNDEB Personalizado</strong>
          — um diagnóstico sob medida para o seu município, com cenários e
          oportunidades de aplicação dos recursos.
        </li>
      </ul>

      <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 20px;">
        Fique atento(a) à sua caixa de entrada — e, se puder, marque nosso remetente
        como confiável para garantir que tudo chegue direitinho.
      </p>

      <!-- Disclaimer para quem não participou -->
      <div style="background:#FFF7ED;border:1px solid #FB923C40;border-radius:12px;padding:18px 20px;margin:20px 0 24px;">
        <p style="color:#9A3412;font-size:14px;margin:0 0 10px;font-weight:700;">
          Não conseguiu participar ao vivo?
        </p>
        <p style="color:#7C2D12;font-size:14px;line-height:1.7;margin:0;">
          Se você se inscreveu mas não pôde estar presente e ainda assim deseja receber
          o <strong>Guia de Implementação</strong> e o <strong>Relatório FUNDEB
          Personalizado</strong>, basta <strong>responder este e-mail</strong>
          informando:
        </p>
        <ul style="color:#7C2D12;font-size:14px;line-height:1.9;margin:10px 0 10px;padding-left:20px;">
          <li>Nome completo</li>
          <li>Município / rede de atuação</li>
          <li>Telefone para contato</li>
        </ul>
        <p style="color:#7C2D12;font-size:14px;line-height:1.7;margin:0;">
          Nossa equipe entrará em contato para alinhar o envio do material.
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
        Mais uma vez, obrigado por acreditar que educação pública de qualidade se
        constrói em rede.
      </p>

      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 24px;">
        Um forte abraço,<br>
        <strong style="color:#0A2463;">Equipe Instituto i10</strong><br>
        <span style="color:#94a3b8;font-size:13px;">Orquestrando o Futuro da Educação Pública</span>
      </p>

      <p style="color:#94a3b8;font-size:12px;line-height:1.5;margin:24px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">
        Você está recebendo este e-mail porque se inscreveu no Webinar BNCC
        Computação 2026 do Instituto i10.
      </p>`;

  return wrapEmailLayout(bodyHtml);
}

const html = buildThankYouHtml("Raphael");
const outPath = join(process.cwd(), "preview-agradecimento.html");
writeFileSync(outPath, html, "utf-8");
console.log(`Preview gerado: ${outPath}`);
console.log(`Assunto: ${thankYouSubject}`);
