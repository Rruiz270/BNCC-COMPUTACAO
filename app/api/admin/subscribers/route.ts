import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "Não autorizado" },
      { status: 401 }
    );
  }

  try {
    const [subscribers, total] = await Promise.all([
      prisma.inscricao.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.inscricao.count(),
    ]);

    return NextResponse.json({ success: true, total, subscribers });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao buscar inscrições" },
      { status: 500 }
    );
  }
}
