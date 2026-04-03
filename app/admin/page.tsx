"use client";

import { useState } from "react";

interface Subscriber {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  municipio: string | null;
  cargo: string | null;
  aceita_atualizacoes: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchSubscribers(pwd: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/subscribers", {
        headers: { Authorization: `Bearer ${pwd}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao buscar dados");
        return;
      }

      setSubscribers(data.subscribers);
      setTotal(data.total);
      setAuthenticated(true);
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchSubscribers(password);
  }

  function exportCSV() {
    const headers = [
      "ID",
      "Nome",
      "Email",
      "Telefone",
      "Município",
      "Cargo",
      "Aceita Atualizações",
      "Data Inscrição",
    ];

    const rows = subscribers.map((s) => [
      s.id,
      `"${s.nome}"`,
      s.email,
      s.telefone || "",
      `"${s.municipio || ""}"`,
      `"${s.cargo || ""}"`,
      s.aceita_atualizacoes ? "Sim" : "Não",
      new Date(s.createdAt).toLocaleString("pt-BR"),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inscritos-webinar-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-dark">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-sm"
        >
          <h1 className="text-xl font-bold text-navy mb-2">Admin</h1>
          <p className="text-sm text-text-gray mb-6">
            Digite a senha para acessar os inscritos.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-60"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-gray">
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Inscritos Webinar BNCC</h1>
          <p className="text-sm text-white/60">{total} inscrito(s)</p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg bg-green text-navy-dark font-semibold text-sm hover:brightness-110 transition-all"
        >
          Exportar CSV
        </button>
      </header>

      <div className="p-6 overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow border border-border text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-gray">
              <th className="text-left px-4 py-3 font-semibold text-text-dark">
                Nome
              </th>
              <th className="text-left px-4 py-3 font-semibold text-text-dark">
                Email
              </th>
              <th className="text-left px-4 py-3 font-semibold text-text-dark">
                Telefone
              </th>
              <th className="text-left px-4 py-3 font-semibold text-text-dark">
                Município
              </th>
              <th className="text-left px-4 py-3 font-semibold text-text-dark">
                Cargo
              </th>
              <th className="text-left px-4 py-3 font-semibold text-text-dark">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border last:border-0 hover:bg-bg-gray/50"
              >
                <td className="px-4 py-3 text-text-dark">{s.nome}</td>
                <td className="px-4 py-3 text-text-gray">{s.email}</td>
                <td className="px-4 py-3 text-text-gray">
                  {s.telefone || "—"}
                </td>
                <td className="px-4 py-3 text-text-gray">
                  {s.municipio || "—"}
                </td>
                <td className="px-4 py-3 text-text-gray">
                  {s.cargo || "—"}
                </td>
                <td className="px-4 py-3 text-text-gray whitespace-nowrap">
                  {new Date(s.createdAt).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-text-gray"
                >
                  Nenhum inscrito ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
