import { NextRequest, NextResponse } from "next/server";

// Simple in-memory subscriber list (configurable placeholder).
// In production, connect to an email provider (e.g. Mailchimp, Buttondown, Resend).
const subscribers: { email: string; at: number }[] = [];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    // Avoid duplicates
    const exists = subscribers.some((s) => s.email === email);
    if (!exists) {
      subscribers.push({ email, at: Date.now() });
    }

    return NextResponse.json({ ok: true, subscribed: !exists });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
