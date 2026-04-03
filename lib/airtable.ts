import { SubscriptionData } from "./validation";
import { prisma } from "./db";

export async function submitSubscription(
  data: SubscriptionData
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.inscricao.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        municipio: data.municipio || null,
        cargo: data.cargo || null,
        aceita_atualizacoes: data.aceita_atualizacoes,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Database error:", err);
    return { success: false, error: "Erro ao registrar inscrição. Tente novamente." };
  }
}
