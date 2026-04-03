import { NextResponse } from "next/server";
import { subscriptionSchema } from "@/lib/validation";
import { submitSubscription } from "@/lib/airtable";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscriptionSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const result = await submitSubscription(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Send confirmation email (await so serverless function doesn't terminate early)
    const emailResult = await sendConfirmationEmail(parsed.data.email, parsed.data.nome);
    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
