"use client";

import { Reveal, fadeUp } from "./primitives/anim";
import { Eyebrow, GoldDivider } from "./primitives/section";
import { ImageReveal, ParallaxImage } from "./primitives/image";
import { BRAND_STORY_IMAGE } from "@/data";

const PHILOSOPHY = [
  { label: "Designed", value: "For the few" },
  { label: "Located", value: "Heart of Athens" },
  { label: "Built", value: "Around stillness" },
];

export function BrandStory() {
  return (
    <section
      id="brand-story"
      className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Large editorial statement */}
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>The Philosophy</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-tight text-charcoal text-balance">
              A quieter way to
              <br />
              <span className="italic font-normal text-gold">experience Athens.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 max-w-xl text-[15px] leading-[1.85] text-charcoal/70 text-pretty">
              V36 Suites is not a hotel in the conventional sense. It is a small,
              private collection of suites behind a quiet façade in the centre of
              Athens — designed around light, stone, and the unhurried rhythm of
              the city. Five doors. A single concierge. The Acropolis, twenty
              minutes on foot. Everything else, closer.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric image + detail composition */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Tall portrait image */}
          <div className="lg:col-span-7">
            <ParallaxImage
              src={BRAND_STORY_IMAGE}
              alt="Architectural detail of warm ivory plaster meeting a stone archway in soft morning light"
              className="aspect-[4/5] w-full lg:aspect-[5/6]"
              amount={40}
            />
          </div>

          {/* Editorial detail column */}
          <div className="flex flex-col justify-between lg:col-span-5 lg:py-10">
            <div>
              <Reveal>
                <Eyebrow>The Address</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-6 font-display text-2xl leading-snug text-charcoal text-balance">
                  Behind a limestone wall on a calm street, a few steps from the
                  life of the city.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-[14px] leading-[1.85] text-charcoal/65 text-pretty">
                  Voulis 36. A name, a number, a doorway. From here, the city
                  opens out — Syntagma three minutes away, the Acropolis twenty,
                  Plaka begins at the corner. The suites themselves are another
                  kind of quiet: hand-troweled plaster, oak floors, linen, and a
                  single brass lamp at the bedside.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <GoldDivider className="mb-8" />
                <dl className="grid grid-cols-3 gap-6">
                  {PHILOSOPHY.map((p) => (
                    <div key={p.label}>
                      <dt className="text-[10px] uppercase tracking-luxe-sm text-charcoal/45">
                        {p.label}
                      </dt>
                      <dd className="mt-2 font-display text-lg leading-tight text-charcoal">
                        {p.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
