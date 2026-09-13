"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { FAQS } from "@/data";
import { Eyebrow } from "./primitives/section";
import { Reveal, EASE_LUXE, DUR } from "./primitives/anim";
import { cn } from "@/lib/utils";

function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-charcoal/12">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="flex items-baseline gap-5">
          <span className="text-[11px] uppercase tracking-luxe-sm text-gold/60">
            0{index + 1}
          </span>
          <span className="font-display text-xl leading-snug text-charcoal text-balance sm:text-2xl">
            {q}
          </span>
        </span>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500",
            open
              ? "border-gold bg-gold text-charcoal"
              : "border-charcoal/20 text-charcoal/60 group-hover:border-gold group-hover:text-gold"
          )}
        >
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE_LUXE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pl-9 text-[14px] leading-[1.85] text-charcoal/65 text-pretty">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Good to Know</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.04] tracking-tight text-charcoal text-balance">
                A few questions, answered.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-sm text-[14px] leading-[1.85] text-charcoal/60 text-pretty">
                Anything else? Our concierge is one message away.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div className="border-t border-charcoal/12">
                {FAQS.map((f, i) => (
                  <FaqItem
                    key={f.q}
                    q={f.q}
                    a={f.a}
                    index={i}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
