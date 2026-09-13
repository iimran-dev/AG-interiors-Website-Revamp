"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { REVIEWS, RATING, type Review } from "@/data";
import { Eyebrow } from "./primitives/section";
import { Reveal, EASE_LUXE, DUR, fadeUp } from "./primitives/anim";
import { cn, getAssetUrl } from "@/lib/utils";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < Math.round(rating) ? "fill-gold text-gold" : "text-charcoal/20"
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative flex h-full flex-col bg-ivory p-8 shadow-[0_30px_80px_-50px_rgba(30,30,30,0.5)] sm:p-10">
      <Quote className="h-7 w-7 text-gold/40" strokeWidth={1} />
      <Stars rating={review.rating} className="mt-5" />
      <h3 className="mt-4 font-display text-2xl leading-tight text-charcoal text-balance">
        {review.title}
      </h3>
      <blockquote className="mt-4 flex-1 text-[14px] leading-[1.8] text-charcoal/65 text-pretty">
        “{review.body}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4 border-t border-charcoal/10 pt-5">
        <img
          src={getAssetUrl(review.avatar)}
          alt={review.name}
          loading="lazy"
          className="h-11 w-11 rounded-full object-cover grayscale"
        />
        <div>
          <div className="text-[13px] font-medium text-charcoal">{review.name}</div>
          <div className="text-[11px] uppercase tracking-luxe-sm text-charcoal/45">
            {review.country} · {review.source}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function GuestReviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % REVIEWS.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length),
    []
  );

  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduce]);

  return (
    <section id="reviews" className="relative overflow-hidden bg-stone py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Heading row */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Loved by Guests</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] tracking-tight text-charcoal text-balance">
                Loved by guests from around the world.
              </h2>
            </Reveal>
          </div>
          {/* Rating block */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="font-display text-5xl text-charcoal">{RATING.score}</div>
                <div className="mt-1 text-[11px] uppercase tracking-luxe-sm text-charcoal/45">
                  {RATING.count.toLocaleString()} {RATING.source}
                </div>
              </div>
              <div className="h-14 w-px bg-charcoal/15" />
              <Stars rating={5} />
            </div>
          </Reveal>
        </div>

        {/* Carousel */}
        <div
          className="mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Show 3 cards on lg, 2 on md, 1 on mobile — animate active index */}
            {REVIEWS.slice(0, 3).map((_, slot) => {
              const r = REVIEWS[(index + slot) % REVIEWS.length];
              return (
                <AnimatePresence mode="wait" key={slot}>
                  <motion.div
                    key={`${slot}-${r.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: DUR.base, ease: EASE_LUXE }}
                    className="h-full"
                  >
                    <ReviewCard review={r} />
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="flex h-11 w-11 items-center justify-center border border-charcoal/15 text-charcoal transition-all duration-500 hover:border-gold hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="flex h-11 w-11 items-center justify-center border border-charcoal/15 text-charcoal transition-all duration-500 hover:border-gold hover:text-gold"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={cn(
                    "h-1.5 transition-all duration-500",
                    i === index ? "w-8 bg-gold" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
