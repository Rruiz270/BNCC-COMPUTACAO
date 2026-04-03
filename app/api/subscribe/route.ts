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

    // Send confirmation email (non-blocking — don't fail the subscription if email fails)
    sendConfirmationEmail(parsed.data.email, parsed.data.nome).catch((err) => {
      console.error("Background email error:", err);
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
