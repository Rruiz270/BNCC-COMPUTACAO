"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const MUNICIPIOS = [
  "Araci", "Araraquara", "Araucária", "Barcelos", "Belo Horizonte",
  "Borborema", "Colômbia", "Cruzmaltina", "Curitiba", "Douradoquara",
  "Ereré", "Jaguaruana", "Japurá", "Jundiaí", "Maragogi", "Mariana",
  "Muqui", "Novo Horizonte", "Onda Verde", "Piên", "Prata", "Redentora",
  "Santa Branca", "Santana de Parnaíba", "São José do Rio Preto",
  "São Paulo", "Sobral", "Sorocaba", "Uruburetama",
];

const UF: Record<string, string> = {
  Araci: "BA", Araraquara: "SP", Araucária: "PR", Barcelos: "AM",
  "Belo Horizonte": "MG", Borborema: "SP", Colômbia: "SP",
  Cruzmaltina: "PR", Curitiba: "PR", Douradoquara: "MG", Ereré: "CE",
  Jaguaruana: "CE", Japurá: "PR", Jundiaí: "SP", Maragogi: "AL",
  Mariana: "MG", Muqui: "ES", "Novo Horizonte": "SP", "Onda Verde": "SP",
  Piên: "PR", Prata: "PB", Redentora: "RS", "Santa Branca": "SP",
  "Santana de Parnaíba": "SP", "São José do Rio Preto": "SP",
  "São Paulo": "SP", Sobral: "CE", Sorocaba: "SP", Uruburetama: "CE",
};

export default function PosWebinar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function maskPhone(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 0) return `(${d}`;
    return "";
  }

  function handlePhone(e: ChangeEvent<HTMLInputElement>) {
    setTelefone(maskPhone(e.target.value));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!nome.trim() || !email.trim() || !telefone.trim() || !municipio) {
      setErrorMsg("Preencha todos os campos.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/pos-webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim(), telefone, municipio }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Erro ao processar. Tente novamente.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <div style={{ fontFamily: "'Inter', Arial, sans-serif", background: "#f8fafc", color: "#1e293b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; }
      `}</style>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #0A2463 0%, #061840 100%)",
        padding: "72px 24px 56px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#00E5A0" }}>i10</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 28 }}>Instituto</div>
        <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 800, color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
          Seus materiais exclusivos<br />estão <span style={{ color: "#00E5A0" }}>prontos</span>.
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
          Você participou do Webinar BNCC Computação 2026. Agora receba o Guia Completo e o Relatório FUNDEB do seu município diretamente no seu e-mail.
        </p>
      </section>

      {/* O QUE RECEBE */}
      <section style={{ padding: "56px 24px", maxWidth: 880, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0A2463", textAlign: "center", marginBottom: 10 }}>O que você vai receber</h2>
        <p style={{ fontSize: 15, color: "#64748b", textAlign: "center", marginBottom: 36, maxWidth: 580, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Dois materiais estratégicos para sua rede municipal, enviados diretamente no seu e-mail.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }}>
          {[
            { t: "Guia Completo de Implementação", d: "O documento mais completo do mercado. Passo a passo, fontes de recurso, checklist de 69 itens, plano de ação trimestral e computação desplugada." },
            { t: "Relatório FUNDEB Personalizado", d: "Diagnóstico sob medida para o seu município com cenários de impacto VAAR e oportunidades de captação de recursos federais." },
            { t: "Checklist de Conformidade", d: "69 itens em 6 dimensões para verificar exatamente onde sua rede está e o que falta para estar em dia." },
            { t: "Plano Municipal + Autodiagnóstico", d: "Modelo pronto para personalizar com metas, orçamento e indicadores. Mais o autodiagnóstico de prontidão em 6 dimensões." },
          ].map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 20px", borderTop: "3px solid #00B4D8" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2463", marginBottom: 6 }}>{c.t}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{c.d}</p>
            </div>
          ))}
        </div>

        {/* URGÊNCIA */}
        <div style={{ background: "linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)", borderRadius: 16, padding: "36px 28px", textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 14 }}>Sua rede pode estar perdendo dinheiro agora.</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, margin: "20px 0", flexWrap: "wrap" as const }}>
            {[["2,5%", "do FUNDEB em risco"], ["70%", "das redes sem implementação"], ["2026", "prazo obrigatório"]].map(([n, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#FCA5A5" }}>{n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Municípios que não implementarem a BNCC Computação podem <strong>perder a complementação VAAR do FUNDEB</strong>. Não é recurso novo — é dinheiro que você <strong>já recebe</strong>.
          </p>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section style={{ padding: "0 24px 56px", maxWidth: 880, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #0A2463 0%, #061840 100%)", borderRadius: 16, padding: "36px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#00E5A0", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 8 }}>Continue conosco</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Siga @institutoi10 no Instagram</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20, lineHeight: 1.6 }}>
            Conteúdo semanal sobre BNCC, FUNDEB, IA na educação e inovação para a gestão pública.
          </p>
          <a href="https://www.instagram.com/institutoi10/" target="_blank" rel="noopener"
            style={{ display: "inline-block", background: "#00E5A0", color: "#061840", fontWeight: 700, fontSize: 15, padding: "13px 32px", borderRadius: 10 }}>
            Seguir @institutoi10
          </a>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section style={{ background: "#0A2463", padding: "56px 24px" }} id="form">
        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 10 }}>Receba seus materiais agora</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: 36, maxWidth: 580, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Preencha abaixo para receber o Guia Completo e o Relatório FUNDEB do seu município diretamente no seu e-mail.
        </p>

        <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 20, padding: "36px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0A2463", marginBottom: 6, textAlign: "center" }}>Solicitar materiais</h3>
          <p style={{ fontSize: 13, color: "#64748b", textAlign: "center", marginBottom: 24, lineHeight: 1.5 }}>
            Cada participante pode solicitar <strong>1 relatório</strong>. Disponível apenas para municípios inscritos no webinar.
          </p>

          {status === "error" && errorMsg && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", fontSize: 13, padding: "12px 14px", borderRadius: 10, marginBottom: 14, textAlign: "center" }}>
              {errorMsg}
            </div>
          )}

          {status === "success" ? (
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontSize: 14, padding: 20, borderRadius: 10, textAlign: "center", lineHeight: 1.6 }}>
              <strong>Solicitação enviada!</strong><br />
              Verifique seu e-mail — o Guia Completo e as informações sobre o Relatório FUNDEB foram enviados. Confira também a pasta de spam.
            </div>
          ) : status === "loading" ? (
            <div style={{ textAlign: "center", padding: 20, color: "#64748b", fontSize: 14 }}>Enviando...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {[
                { label: "Nome completo", type: "text", value: nome, onChange: (e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value), placeholder: "Seu nome completo" },
                { label: "E-mail", type: "email", value: email, onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), placeholder: "seunome@municipio.gov.br" },
                { label: "Telefone (com DDD)", type: "tel", value: telefone, onChange: handlePhone, placeholder: "(11) 99999-9999" },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 5 }}>{f.label}</label>
                  <input type={f.type} value={f.value} onChange={f.onChange} placeholder={f.placeholder} required
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0", borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: "#1e293b", background: "#f8fafc" }} />
                </div>
              ))}

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Município</label>
                <select value={municipio} onChange={(e) => setMunicipio(e.target.value)} required
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0", borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: "#1e293b", background: "#f8fafc" }}>
                  <option value="">Selecione seu município...</option>
                  {MUNICIPIOS.map(m => (
                    <option key={m} value={m}>{m} — {UF[m]}</option>
                  ))}
                </select>
              </div>

              <button type="submit" style={{
                width: "100%", background: "#00E5A0", color: "#061840", fontWeight: 700, fontSize: 16,
                padding: "14px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "center"
              }}>
                Receber materiais no meu e-mail
              </button>

              <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 14, lineHeight: 1.4 }}>
                Limitado a 1 relatório por participante (e-mail ou telefone). Seus dados não serão compartilhados.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CTA CONSULTORIA */}
      <section style={{ padding: "56px 24px", maxWidth: 880, margin: "0 auto" }}>
        <div style={{
          maxWidth: 640, margin: "0 auto", background: "linear-gradient(135deg, #0A2463 0%, #00B4D8 100%)",
          borderRadius: 20, padding: "40px 28px", textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <span style={{ display: "inline-block", background: "rgba(0,229,160,0.2)", color: "#00E5A0", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, padding: "5px 12px", borderRadius: 20, marginBottom: 14 }}>
            Oportunidade exclusiva
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Quer captar mais recursos para sua rede?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 24, maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            O Instituto i10 oferece consultoria personalizada para municípios que querem acelerar a implementação e maximizar a captação de FUNDEB, PDDE, PIEC e Encomenda Tecnológica.
          </p>
          <a href="mailto:institutoi10.org@gmail.com?subject=Consultoria%20BNCC%20Computação%20—%20Quero%20saber%20mais"
            style={{ display: "inline-block", background: "#00E5A0", color: "#061840", fontWeight: 700, fontSize: 16, padding: "14px 40px", borderRadius: 10 }}>
            Quero saber mais sobre a consultoria
          </a>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 12 }}>institutoi10.org@gmail.com</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#061840", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: 4 }}>Orquestrando o Futuro da Educação Pública</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Instituto i10. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
