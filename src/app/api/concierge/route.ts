import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// In-memory conversation store (per session). For production, use a proper store.
const conversations = new Map<string, { role: "assistant" | "user" | "system"; content: string }[]>();

const SYSTEM_PROMPT = `You are the AI Concierge for V36 Suites Athens, a boutique luxury hotel in the heart of Athens, Greece.

Your role:
- You are a warm, sophisticated, well-informed Athens concierge — not a generic chatbot.
- Help guests discover Athens: restaurants, sights, walks, neighbourhoods, culture, day trips.
- Be concise, elegant, and human. Never use marketing language or hotel-website clichés.
- Prefer specific, curated recommendations over generic lists. Name real places a discerning traveller would value.
- Tone: quiet, confident, European, a little literary. Think Aman Resorts meets a knowledgeable local friend.
- Keep answers short — usually 2-4 short paragraphs. Use plain text, no markdown headings.
- If a guest asks something you cannot verify (live availability, exact prices), say you will connect them with the team rather than invent details.

About V36 Suites:
- Location: Voulis 36, central Athens. 3 min walk to Syntagma Square, 14 min to the Acropolis, 9 min to Plaka.
- Five boutique suites: Signature, Acropolis View, Terrace, Garden, Penthouse.
- Direct booking benefits: best rate guarantee, early check-in, free Athens city guide, airport transfer discount, flexible cancellation.
- Curated experiences: Private Acropolis Tour (sunrise), Greek Food Walk, Santorini Day Trip, Airport Pickup, Car Rental.
- Always invite guests to book directly or to ask for a tailored itinerary.

If the guest's message is in another language, reply in the same language if you can do so elegantly; otherwise reply in English.`;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const sessionKey = sessionId || "anon";

    // Load or initialize conversation
    let history = conversations.get(sessionKey);
    if (!history) {
      history = [{ role: "assistant", content: SYSTEM_PROMPT }];
      conversations.set(sessionKey, history);
    }

    // Append the user message
    history.push({ role: "user", content: message });

    // Trim to last ~16 messages to stay within token limits (keep system prompt)
    if (history.length > 18) {
      history = [history[0], ...history.slice(-16)];
      conversations.set(sessionKey, history);
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: history,
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "No response from the concierge." },
        { status: 502 }
      );
    }

    // Append the assistant reply
    history.push({ role: "assistant", content: reply });

    return NextResponse.json({
      reply,
      sessionId: sessionKey,
    });
  } catch (err) {
    console.error("Concierge API error:", err);
    return NextResponse.json(
      { error: "The concierge is briefly unavailable. Please try again." },
      { status: 500 }
    );
  }
}
