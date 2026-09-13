"use client";

import { Reveal } from "./primitives/anim";
import { Eyebrow, GhostLink } from "./primitives/section";
import { ParallaxImage, ImageReveal } from "./primitives/image";
import { DESTINATIONS } from "@/data";

export function DestinationStory() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Statement */}
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>The Destination</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-tight text-ivory text-balance">
              A city to be
              <br />
              <span className="italic font-normal text-gold">read on foot.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-ivory/65 text-pretty">
              Athens rewards the unhurried. Mornings of light on marble, afternoons
              in shaded lanes, evenings that drift from rooftop to taverna. These
              are the chapters of the city, as we know it.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric editorial image grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {DESTINATIONS.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 0.08}
              className={d.span}
            >
              <figure className="group relative h-full w-full overflow-hidden">
                {i === 0 || i === 3 ? (
                  <ParallaxImage
                    src={d.image}
                    alt={d.title}
                    className="h-full w-full"
                    amount={30}
                  />
                ) : (
                  <ImageReveal
                    src={d.image}
                    alt={d.title}
                    className="h-full w-full"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="text-[10px] uppercase tracking-luxe-sm text-gold">
                    {d.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ivory sm:text-[1.6rem]">
                    {d.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ivory/65">
                    {d.text}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <GhostLink href="#explore-athens" dark>
              See the Map
            </GhostLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
