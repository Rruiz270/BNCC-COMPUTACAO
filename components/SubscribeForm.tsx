"use client";

import { useState, FormEvent } from "react";
import { CARGO_OPTIONS } from "@/lib/validation";

interface FieldErrors {
  nome?: string[];
  email?: string[];
  telefone?: string[];
}

export default function SubscribeForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [cargo, setCargo] = useState("");
  const [aceita, setAceita] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          municipio: municipio.trim(),
          cargo,
          aceita_atualizacoes: aceita,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        } else {
          setErrorMsg(data.error || "Algo deu errado, tente novamente.");
        }
        return;
      }

      setSuccess(true);
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-xl border border-border">
        <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text-dark mb-2">
          Inscrição confirmada!
        </h3>
        <p className="text-text-gray">
          Obrigado, <span className="font-semibold">{nome}</span>! Confira seu
          e-mail para receber o link de acesso ao webinar.
        </p>
      </div>
    );
  }

  return (
    <form
      id="inscricao-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-border"
      noValidate
    >
      <h3 className="text-lg font-bold text-text-dark mb-1">
        Inscreva-se gratuitamente
      </h3>
      <p className="text-sm text-text-gray mb-6">
        Preencha seus dados e garanta sua vaga no webinar.
      </p>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Nome */}
      <div className="mb-4">
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-text-dark mb-1"
        >
          Nome *
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
        />
        {fieldErrors.nome && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.nome[0]}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-dark mb-1"
        >
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.email[0]}</p>
        )}
      </div>

      {/* Telefone */}
      <div className="mb-4">
        <label
          htmlFor="telefone"
          className="block text-sm font-medium text-text-dark mb-1"
        >
          Telefone
        </label>
        <input
          id="telefone"
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(formatPhone(e.target.value))}
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
        />
        {fieldErrors.telefone && (
          <p className="mt-1 text-xs text-red-600">
            {fieldErrors.telefone[0]}
          </p>
        )}
      </div>

      {/* Municipio + Cargo row */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="municipio"
            className="block text-sm font-medium text-text-dark mb-1"
          >
            Município
          </label>
          <input
            id="municipio"
            type="text"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            placeholder="Sua cidade"
            className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="cargo"
            className="block text-sm font-medium text-text-dark mb-1"
          >
            Cargo
          </label>
          <select
            id="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all bg-white"
          >
            {CARGO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={aceita}
            onChange={(e) => setAceita(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-border text-cyan focus:ring-cyan"
          />
          <span className="text-xs text-text-gray">
            Aceito receber atualizações sobre o webinar e conteúdos do Instituto
            i10.
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-green text-navy-dark font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Enviando...
          </>
        ) : (
          "Inscrever Agora"
        )}
      </button>
    </form>
  );
}
