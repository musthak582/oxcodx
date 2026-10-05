import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry";
import { sendEnquiryEmails } from "@/lib/mail";

export const runtime = "nodejs";

// Best-effort rate limit: 5 enquiries per IP per 10 minutes
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

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Please check your details." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot: pretend success so bots learn nothing
  if (data.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isProd && limited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  // Email not configured yet
  if (!process.env.RESEND_API_KEY || !process.env.ENQUIRY_TO) {
    if (!isProd) {
      console.log("\n[enquiry:dev] Email not configured, logging instead:\n", data, "\n");
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[enquiry] RESEND_API_KEY or ENQUIRY_TO is missing");
    return NextResponse.json(
      { message: "Our email service isn't available right now. Please try again later." },
      { status: 500 }
    );
  }

  try {
    await sendEnquiryEmails(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[enquiry] send failed:", e);
    return NextResponse.json(
      { message: "We couldn't send your message. Please try again in a moment." },
      { status: 500 }
    );
  }
}