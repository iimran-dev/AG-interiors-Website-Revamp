"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Maximize2, Users } from "lucide-react";
import { SUITES, type Suite } from "@/data";
import { Eyebrow, GhostLink } from "./primitives/section";
import { Reveal, fadeUp, EASE_LUXE, DUR } from "./primitives/anim";
import { cn, getAssetUrl } from "@/lib/utils";

function SuiteCard({ suite, index }: { suite: Suite; index: number }) {
  return (
    <article
      className="group relative w-[85vw] shrink-0 snap-center sm:w-[440px] lg:w-[480px]"
      aria-label={`${suite.name} — ${suite.sqm} square metres, ${suite.guests} guests`}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={getAssetUrl(suite.image)}
          alt={`${suite.name} interior`}
          loading={index < 2 ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

        {/* Eyebrow on image */}
        <div className="absolute left-5 top-5">
          <span className="text-[10px] uppercase tracking-luxe-sm text-ivory/90">
            0{index + 1} — {suite.eyebrow}
          </span>
        </div>

        {/* Availability pill */}
        {suite.available > 0 ? (
          <div className="absolute right-5 top-5 flex items-center gap-1.5 bg-charcoal/55 px-3 py-1.5 text-[10px] uppercase tracking-luxe-sm text-ivory backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {suite.available} left
          </div>
        ) : (
          <div className="absolute right-5 top-5 bg-charcoal/55 px-3 py-1.5 text-[10px] uppercase tracking-luxe-sm text-ivory/70 backdrop-blur-sm">
            Fully booked
          </div>
        )}

        {/* Price tag floating */}
        <div className="absolute bottom-5 left-5">
          <div className="text-[10px] uppercase tracking-luxe-sm text-ivory/70">
            From
          </div>
          <div className="font-display text-2xl text-ivory">
            €{suite.fromPrice}
            <span className="ml-1 text-[11px] font-sans tracking-luxe-sm text-ivory/60">
              / night
            </span>
          </div>
        </div>
      </div>

      {/* Card footer details */}
      <div className="mt-5 border-t border-charcoal/10 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl tracking-tight text-charcoal">
            {suite.name}
          </h3>
          <div className="flex items-center gap-1 text-[12px] text-charcoal/60">
            <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            {suite.sqm} m²
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-[12px] text-charcoal/55">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" strokeWidth={1.5} />
            {suite.guests} Guests
          </span>
          <span className="h-3 w-px bg-charcoal/15" />
          <span>{suite.view}</span>
        </div>

        <p className="mt-4 text-[13.5px] leading-[1.7] text-charcoal/65 text-pretty">
          {suite.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {suite.highlights.map((h) => (
            <span
              key={h}
              className="text-[11px] uppercase tracking-luxe-sm text-charcoal/45"
            >
              · {h}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <GhostLink href={`#suite-${suite.id}`}>View details</GhostLink>
          <button
            type="button"
            className="bg-gold px-5 py-2.5 text-[11px] font-medium uppercase tracking-luxe-sm text-charcoal transition-colors duration-500 hover:bg-[#B8915A]"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

export function SuiteShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  };

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 500, behavior: "smooth" });
  };

  return (
    <section id="suites" className="relative bg-stone py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Heading row — asymmetric */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The Suites</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-tight text-charcoal text-balance">
                Five suites.
                <br />
                <span className="italic font-normal text-gold">Five ways to stay.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[14px] leading-[1.8] text-charcoal/60 text-pretty md:text-right">
              Each suite is composed differently — a view, a terrace, a garden, a
              vault — but all share the same calm, the same light, and the same
              attention to detail.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal scroller — extends to the right edge */}
      <div className="mt-16">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="scrollbar-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-12"
          style={{ scrollPaddingLeft: "max(1.25rem, calc((100vw - 1400px) / 2 + 1.5rem))" }}
        >
          {/* Spacer to align first card with container */}
          <div className="w-0 shrink-0" aria-hidden />
          {SUITES.map((suite, i) => (
            <SuiteCard key={suite.id} suite={suite} index={i} />
          ))}
          {/* End card */}
          <div className="flex w-[80vw] shrink-0 snap-center items-center sm:w-[360px]">
            <div className="w-full">
              <Eyebrow>More</Eyebrow>
              <p className="mt-6 font-display text-2xl leading-snug text-charcoal text-balance">
                Every suite can be combined with a curated experience. Speak with
                our concierge.
              </p>
              <GhostLink href="#experiences" className="mt-6">
                View Experiences
              </GhostLink>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls — desktop only */}
      <div className="mx-auto mt-6 max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous suite"
              className="flex h-11 w-11 items-center justify-center border border-charcoal/15 text-charcoal transition-all duration-500 hover:border-gold hover:text-gold disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next suite"
              className="flex h-11 w-11 items-center justify-center border border-charcoal/15 text-charcoal transition-all duration-500 hover:border-gold hover:text-gold disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="hidden text-[11px] uppercase tracking-luxe-sm text-charcoal/45 sm:block">
            Drag · swipe · scroll →
          </div>
        </div>
      </div>
    </section>
  );
}
