"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { INSTAGRAM_POSTS } from "@/data";
import { Eyebrow } from "./primitives/section";
import { Reveal, stagger, fadeUp } from "./primitives/anim";
import { motion } from "framer-motion";

/* Newsletter — luxury editorial */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      toast.success("Welcome to V36. A little Athens is on its way.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow className="justify-center">Newsletter</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.04] tracking-tight text-charcoal text-balance">
            A little Athens,
            <br />
            <span className="italic font-normal text-gold">delivered.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-md text-[15px] leading-[1.85] text-charcoal/65 text-pretty">
            Curated Athens recommendations, travel inspiration, and the occasional
            V36 update. Quiet, considered, never frequent.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {!submitted ? (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex max-w-md items-center gap-2 border-b border-charcoal/30 pb-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent px-1 py-2 text-[14px] text-charcoal outline-none placeholder:text-charcoal/40"
                aria-label="Your email"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 bg-gold px-5 py-2.5 text-[11px] font-medium uppercase tracking-luxe-sm text-charcoal transition-colors duration-500 hover:bg-[#B8915A]"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          ) : (
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 border-b border-gold/40 pb-2 text-[14px] text-charcoal">
              <Check className="h-4 w-4 text-gold" />
              Thank you — you are on the list.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* Instagram feed — curated editorial */
export function InstagramFeed() {
  return (
    <section id="instagram" className="relative bg-ivory py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Follow Along</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] tracking-tight text-charcoal text-balance">
                @v36suites
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-luxe-sm text-charcoal/80 transition-colors hover:text-gold"
            >
              Follow V36 Suites
              <span className="relative h-px w-6 overflow-hidden bg-current opacity-40 transition-all duration-500 group-hover:w-10 group-hover:opacity-100">
                <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
              </span>
            </a>
          </Reveal>
        </div>

        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {INSTAGRAM_POSTS.map((post) => (
            <motion.a
              key={post.id}
              variants={fadeUp}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="p-4 text-[11px] leading-snug text-ivory/85">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
