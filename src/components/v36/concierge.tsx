"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, X, Sparkles, ChevronDown } from "lucide-react";
import { CONCIERGE_PROMPTS } from "@/data";
import { EASE_LUXE, DUR } from "./primitives/anim";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Kalós orísete — welcome to V36. I'm your Athens concierge. Ask me anything about the city, the suites, or how to spend your days here.",
};

export function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(
    () => `s-${Math.random().toString(36).slice(2, 10)}`
  );
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [messages, loading, open, reduce]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setLoading(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Forgive me — I couldn't reach the concierge just now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: DUR.base, ease: EASE_LUXE }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-charcoal py-3 pl-3 pr-5 text-ivory shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] sm:bottom-8 sm:right-8"
            aria-label="Open AI Concierge"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-charcoal">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="text-left">
              <span className="block text-[10px] uppercase tracking-luxe-sm text-gold">
                AI Concierge
              </span>
              <span className="block text-[13px] leading-tight">Ask me anything</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: DUR.base, ease: EASE_LUXE }}
            className="fixed bottom-0 right-0 z-50 flex h-[100svh] w-full flex-col bg-charcoal text-ivory sm:bottom-5 sm:right-5 sm:h-[640px] sm:max-h-[85svh] sm:w-[400px] sm:rounded-none"
            role="dialog"
            aria-label="AI Concierge"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold text-charcoal">
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-charcoal bg-green-500" />
                </span>
                <div>
                  <div className="text-[13px] font-medium text-ivory">
                    Your Athens Concierge
                  </div>
                  <div className="text-[10px] uppercase tracking-luxe-sm text-gold/70">
                    Online · V36 Suites
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close concierge"
                className="flex h-9 w-9 items-center justify-center text-ivory/60 transition-colors hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-5 scrollbar-hidden"
            >
              <div className="flex flex-col gap-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_LUXE }}
                    className={cn(
                      "flex",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed text-pretty",
                        m.role === "user"
                          ? "bg-gold text-charcoal"
                          : "bg-white/5 text-ivory/90 border border-white/10"
                      )}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 bg-white/5 px-4 py-3.5 border border-white/10">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-gold/70"
                          style={{
                            animation: `pulse 1.4s ease-in-out ${d * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Suggested prompts — only show at start */}
                {messages.length === 1 && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-2"
                  >
                    <div className="mb-3 text-[10px] uppercase tracking-luxe-sm text-ivory/40">
                      Try asking
                    </div>
                    <div className="flex flex-col gap-2">
                      {CONCIERGE_PROMPTS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => send(p)}
                          className="group flex items-center justify-between border border-white/10 px-4 py-3 text-left text-[12.5px] text-ivory/80 transition-colors hover:border-gold/60 hover:text-ivory"
                        >
                          {p}
                          <ChevronDown
                            className="h-3.5 w-3.5 -rotate-90 text-ivory/40 transition-colors group-hover:text-gold"
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 p-3"
            >
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the concierge…"
                  className="w-full bg-transparent px-1 py-2 text-[13.5px] text-ivory outline-none placeholder:text-ivory/35"
                  aria-label="Message"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send"
                  className="flex h-9 w-9 shrink-0 items-center justify-center bg-gold text-charcoal transition-all duration-500 hover:bg-[#B8915A] disabled:opacity-40"
                >
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-2 px-1 text-[10px] uppercase tracking-luxe-sm text-ivory/30">
                Powered by V36 AI · Always confirm bookings with our team
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
