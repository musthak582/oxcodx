import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/application";
import { sendApplicationEmails } from "@/lib/mail";

export const runtime = "nodejs";

// Best-effort rate limit: 5 applications per IP per 10 minutes
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const isProd = process.env.NODE_ENV === "production";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Please check your details." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  if (data.website) return NextResponse.json({ ok: true }); // honeypot

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isProd && limited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const to = process.env.CAREERS_TO ?? process.env.ENQUIRY_TO;
  if (!process.env.RESEND_API_KEY || !to) {
    if (!isProd) {
      console.log("\n[apply:dev] Email not configured, logging instead:\n", data, "\n");
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[apply] RESEND_API_KEY or ENQUIRY_TO is missing");
    return NextResponse.json(
      { message: "Our email service isn't available right now. Please try again later." },
      { status: 500 }
    );
  }

  try {
    await sendApplicationEmails(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[apply] send failed:", e);
    return NextResponse.json(
      { message: "We couldn't send your application. Please try again in a moment." },
      { status: 500 }
    );
  }
}