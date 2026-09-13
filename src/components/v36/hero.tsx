"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CalendarDays, Users, ArrowRight, Star, MapPin, ShieldCheck } from "lucide-react";
import { GoldButton, GhostLink } from "./primitives/section";
import { EASE_LUXE, DUR } from "./primitives/anim";
import { HERO_IMAGE, OCCUPANCY } from "@/data";
import { getAssetUrl } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  BookingWidget — floating glass widget                              */
/* ------------------------------------------------------------------ */

function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.slow, ease: EASE_LUXE, delay: 0.9 }}
      className="glass w-full max-w-[460px] border border-white/50 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] ring-1 ring-black/5"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-luxe-sm text-charcoal/80">
          Reserve Your Suite
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-gold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-luxe-sm text-charcoal/70">
            Check-in
          </span>
          <div className="flex items-center gap-2 border-b border-charcoal/20 pb-2 transition-colors focus-within:border-gold">
            <CalendarDays className="h-3.5 w-3.5 text-charcoal/50" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-[13px] text-charcoal outline-none placeholder:text-charcoal/40"
            />
          </div>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] uppercase tracking-luxe-sm text-charcoal/70">
            Check-out
          </span>
          <div className="flex items-center gap-2 border-b border-charcoal/20 pb-2 transition-colors focus-within:border-gold">
            <CalendarDays className="h-3.5 w-3.5 text-charcoal/50" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-[13px] text-charcoal outline-none placeholder:text-charcoal/40"
            />
          </div>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[10px] uppercase tracking-luxe-sm text-charcoal/70">
          Guests
        </span>
        <div className="flex items-center gap-2 border-b border-charcoal/20 pb-2 transition-colors focus-within:border-gold">
          <Users className="h-3.5 w-3.5 text-charcoal/50" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent text-[13px] text-charcoal outline-none"
          >
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>
          </select>
        </div>
      </label>

      <button
        type="button"
        className="group mt-6 flex w-full items-center justify-center gap-2.5 bg-gold py-3.5 text-[12px] font-medium uppercase tracking-luxe-sm text-charcoal transition-colors duration-500 hover:bg-[#B8915A]"
      >
        Check Availability
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
      </button>

      <p className="mt-3 text-center text-[10px] uppercase tracking-luxe-sm text-charcoal/55">
        Best rate guaranteed · No booking fee
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  TrustSignals                                                       */
/* ------------------------------------------------------------------ */

function TrustSignals() {
  const signals = [
    { icon: Star, label: "4.9/5 Exceptional", sub: RATING_LABEL },
    { icon: MapPin, label: "250m from Syntagma", sub: "Heart of Athens" },
    { icon: ShieldCheck, label: "Best Rate Guarantee", sub: "Book direct" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.base, ease: EASE_LUXE, delay: 1.4 }}
      className="flex flex-wrap items-center gap-x-8 gap-y-4"
    >
      {signals.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <s.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <div className="leading-tight">
            <div className="text-[13px] font-medium text-ivory">{s.label}</div>
            <div className="text-[10px] uppercase tracking-luxe-sm text-ivory/50">
              {s.sub}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
const RATING_LABEL = "Google Reviews";

/* ------------------------------------------------------------------ */
/*  LiveOccupancy                                                      */
/* ------------------------------------------------------------------ */

function LiveOccupancy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base, ease: EASE_LUXE, delay: 1.6 }}
      className="flex items-center gap-3 text-ivory/80"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      <span className="text-[12px] tracking-luxe-sm">
        <span className="text-gold">{OCCUPANCY.remainingTonight}</span> {OCCUPANCY.note}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative grain h-[100svh] min-h-[680px] w-full overflow-hidden"
    >
      {/* Background image with slow zoom/parallax */}
      <motion.div
        style={reduce ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0"
      >
        <img
          src={getAssetUrl(HERO_IMAGE)}
          alt="Athens at golden hour with the Acropolis glowing in warm light"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Gradient overlays for legibility — strong on the text side */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-charcoal/45" />
      {/* Localized darkening behind the text block */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 75% at 15% 50%, rgba(30,30,30,0.75) 0%, rgba(30,30,30,0.25) 45%, transparent 70%)",
        }}
      />

      <motion.div
        style={reduce ? undefined : ({ y: contentY, opacity: contentOpacity } as any)}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-5 pt-20 sm:px-8 lg:px-12"
      >
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left — text */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, ease: EASE_LUXE, delay: 0.3 }}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-gold"
            >
              <span className="h-px w-8 bg-gold/60" />
              Athens · Boutique Suites
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.hero, ease: EASE_LUXE, delay: 0.45 }}
              className="mt-6 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[0.98] tracking-tight text-ivory text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]"
            >
              Live the Athens
              <br />
              <span className="italic font-normal text-ivory">You Love</span>
              <span className="ml-3 inline-block h-[0.7em] w-[0.06em] translate-y-[0.1em] bg-gold align-middle" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, ease: EASE_LUXE, delay: 0.7 }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-ivory text-pretty [text-shadow:0_1px_16px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.5)]"
            >
              Boutique suites in the heart of Athens, designed for those who want
              to experience the city differently.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, ease: EASE_LUXE, delay: 0.85 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <GoldButton
                variant="solid"
                className="shadow-[0_20px_50px_-20px_rgba(198,162,107,0.6)]"
              >
                Book Your Stay
              </GoldButton>
              <GhostLink href="#suites" dark>
                Explore Suites
              </GhostLink>
            </motion.div>

            <div className="mt-10">
              <LiveOccupancy />
            </div>

            <div className="mt-8">
              <TrustSignals />
            </div>
          </div>

          {/* Right — floating booking widget */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.base, delay: 0.8 }}
            className="hidden justify-self-end lg:col-span-5 lg:flex lg:justify-end"
          >
            <BookingWidget />
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile booking widget — below the fold */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.slow, ease: EASE_LUXE, delay: 1.1 }}
        className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 lg:hidden"
      >
        <div className="glass flex items-center justify-between border border-white/30 p-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-luxe-sm text-charcoal/55">
              From €179 / night
            </span>
            <span className="text-[13px] font-medium text-charcoal">
              Check Availability
            </span>
          </div>
          <button
            type="button"
            className="bg-gold px-5 py-3 text-[11px] font-medium uppercase tracking-luxe-sm text-charcoal"
          >
            Book
          </button>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.base, delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-ivory/60"
        >
          <span className="text-[10px] uppercase tracking-luxe-sm">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-ivory/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
