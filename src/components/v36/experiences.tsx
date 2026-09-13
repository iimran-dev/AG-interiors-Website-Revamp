"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/data";
import { Eyebrow, GhostLink } from "./primitives/section";
import { Reveal, fadeUp, stagger } from "./primitives/anim";
import { HoverZoom } from "./primitives/image";
import { cn } from "@/lib/utils";

function ExperienceCard({
  experience,
  className,
}: {
  experience: (typeof EXPERIENCES)[number];
  className?: string;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-charcoal shadow-sm transition-all duration-500 hover:shadow-xl",
        className
      )}
    >
      <HoverZoom
        src={experience.image}
        alt={experience.name}
        className="h-full w-full"
        zoom={1.06}
      >
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent transition-opacity duration-500 group-hover:from-charcoal/90 group-hover:via-charcoal/30" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          {/* Category & Duration badge */}
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
            <span>{experience.category}</span>
            <span className="opacity-80">{experience.duration}</span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "mt-2.5 font-display text-ivory leading-tight text-balance font-medium tracking-tight",
              experience.featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl"
            )}
          >
            {experience.name}
          </h3>

          {/* Description */}
          <p
            className={cn(
              "mt-2.5 leading-relaxed text-ivory/70 text-pretty font-sans",
              experience.featured
                ? "max-w-xl text-[13px] sm:text-[14px] line-clamp-3 sm:line-clamp-4"
                : "text-[12px] sm:text-[13px] line-clamp-2"
            )}
          >
            {experience.description}
          </p>

          {/* Action Row */}
          <div className="mt-5 flex items-center justify-between pt-3 border-t border-ivory/15">
            <GhostLink dark href="#contact">
              Enquire
            </GhostLink>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </HoverZoom>
    </motion.article>
  );
}

export function Experiences() {
  const featured = EXPERIENCES.find((e) => e.featured)!;
  const supporting = EXPERIENCES.filter((e) => !e.featured);

  return (
    <section id="experiences" className="relative bg-ivory py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Handpicked</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.06] tracking-tight text-charcoal text-balance">
                Handpicked experiences
                <br />
                <span className="italic font-normal text-gold">in Athens.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[14px] leading-[1.85] text-charcoal/65 text-pretty md:text-right">
              A small, edited collection of experiences arranged by our concierge.
              Each chosen for what it reveals about the city — not for how it
              photographs.
            </p>
          </Reveal>
        </div>

        {/* Magazine Grid Layout: Perfectly aligned 7:5 layout */}
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:h-[580px]"
        >
          {/* Featured — large card spanning 7 columns and full height */}
          <ExperienceCard
            experience={featured}
            className="lg:col-span-7 h-[420px] sm:h-[480px] lg:h-full"
          />

          {/* Supporting — 4 small cards in 5 columns, 2x2 grid filling full height */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:h-full">
            {supporting.map((e) => (
              <ExperienceCard
                key={e.id}
                experience={e}
                className="h-[280px] sm:h-[230px] lg:h-full"
              />
            ))}
          </div>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <GhostLink href="#concierge">Speak with the Concierge</GhostLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
