import { z } from "zod";

export const subscriptionSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("E-mail inválido"),
  telefone: z
    .string()
    .trim()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      "Formato inválido. Use (11) 99999-9999"
    )
    .optional()
    .or(z.literal("")),
  municipio: z.string().trim().optional().or(z.literal("")),
  cargo: z.string().trim().optional().or(z.literal("")),
  aceita_atualizacoes: z.boolean().default(false),
});

export type SubscriptionData = z.infer<typeof subscriptionSchema>;

export const CARGO_OPTIONS = [
  { value: "", label: "Selecione seu cargo" },
  { value: "secretario", label: "Secretário(a) de Educação" },
  { value: "gestor", label: "Gestor(a)" },
  { value: "diretor", label: "Diretor(a)" },
  { value: "coordenador", label: "Coordenador(a)" },
  { value: "professor", label: "Professor(a)" },
  { value: "outro", label: "Outro" },
];
