"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Clock, BookOpen, Plane, RefreshCw } from "lucide-react";
import { BENEFITS } from "@/data";
import { Eyebrow } from "./primitives/section";
import { Reveal, stagger, fadeUp, EASE_LUXE, DUR } from "./primitives/anim";
import { cn } from "@/lib/utils";

const ICONS = {
  shield: ShieldCheck,
  clock: Clock,
  book: BookOpen,
  plane: Plane,
  refresh: RefreshCw,
} as const;

function BenefitItem({
  icon,
  title,
  description,
  index,
}: {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const Icon = ICONS[icon];
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-5 border-t border-white/10 pt-7"
    >
      <span className="absolute right-0 top-7 text-[10px] uppercase tracking-luxe-sm text-gold/40">
        0{index + 1}
      </span>
      <div className="relative h-7 w-7">
        <Icon
          className="absolute inset-0 h-7 w-7 text-gold transition-transform duration-700 group-hover:-translate-y-0.5"
          strokeWidth={1}
        />
        {/* Gold underline that grows on hover */}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-7" />
      </div>
      <div>
        <h3 className="font-display text-xl leading-snug text-ivory">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ivory/55 text-pretty">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function BookingBenefits() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-charcoal py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Direct Booking</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.04] tracking-tight text-ivory text-balance">
                More Benefits.
                <br />
                <span className="italic font-normal text-gold">More Value.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-sm text-[14px] leading-[1.85] text-ivory/55 text-pretty">
                When you book directly with V36, you stay closer to the property —
                and to Athens. A few of the reasons to book with us.
              </p>
            </Reveal>
          </div>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3"
          >
            {BENEFITS.map((b, i) => (
              <BenefitItem
                key={b.title}
                icon={b.icon}
                title={b.title}
                description={b.description}
                index={i}
              />
            ))}
            {/* Extra cell — invitation */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-end border-t border-white/10 pt-7"
            >
              <span className="text-[10px] uppercase tracking-luxe-sm text-gold/60">
                The V36 Difference
              </span>
              <p className="mt-3 font-display text-xl leading-snug text-ivory/90 text-pretty">
                Book direct. Stay closer.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
