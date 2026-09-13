"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Instagram, Facebook, MapPin, Phone, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { CONTACT } from "@/data";
import { GoldDivider } from "./primitives/section";
import { Reveal } from "./primitives/anim";

const EXPLORE_LINKS = [
  { label: "Suites", href: "#suites" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Athens", href: "#explore-athens" },
];

const INFO_LINKS = [
  { label: "About", href: "#brand-story" },
  { label: "FAQ", href: "#faq" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cancellation", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      toast.success("Welcome to V36.");
      setEmail("");
    } catch {
      toast.error("Please try again.");
    }
  };

  return (
    <footer id="footer" className="relative bg-charcoal text-ivory">
      {/* Top — large wordmark + newsletter */}
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Wordmark + tagline */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="font-display text-5xl tracking-tight sm:text-6xl">
                <span className="font-medium">V36</span>
                <span className="ml-2 text-[0.4em] uppercase tracking-luxe-sm align-middle text-gold">
                  Suites
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-sm font-display text-2xl italic leading-snug text-ivory/70 text-balance">
                Boutique luxury in the heart of Athens.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-[13px] leading-[1.85] text-ivory/45 text-pretty">
                A small, private collection of suites on Voulis 36 — designed
                around light, stone, and the unhurried rhythm of the city.
              </p>
            </Reveal>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <Reveal delay={0.05}>
              <div>
                <h3 className="text-[10px] uppercase tracking-luxe-sm text-gold/70">
                  Explore
                </h3>
                <ul className="mt-5 space-y-3">
                  {EXPLORE_LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[13px] text-ivory/65 transition-colors hover:text-gold"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h3 className="text-[10px] uppercase tracking-luxe-sm text-gold/70">
                  Information
                </h3>
                <ul className="mt-5 space-y-3">
                  {INFO_LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[13px] text-ivory/65 transition-colors hover:text-gold"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-[10px] uppercase tracking-luxe-sm text-gold/70">
                  Contact
                </h3>
                <ul className="mt-5 space-y-4 text-[13px] text-ivory/65">
                  <li className="flex gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                    <span>{CONTACT.address}</span>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>

                {/* Social */}
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center border border-ivory/15 text-ivory/60 transition-all duration-500 hover:border-gold hover:text-gold"
                  >
                    <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center border border-ivory/15 text-ivory/60 transition-all duration-500 hover:border-gold hover:text-gold"
                  >
                    <Facebook className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Compact newsletter band */}
        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-white/10 pt-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl text-ivory">
                  A little Athens, delivered.
                </h3>
                <p className="mt-1 text-[12px] text-ivory/45">
                  Curated recommendations & V36 updates. Quiet, never frequent.
                </p>
              </div>
              <form
                onSubmit={onSubscribe}
                className="flex w-full items-center gap-2 border-b border-ivory/25 pb-2 sm:w-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent px-1 py-2 text-[13px] text-ivory outline-none placeholder:text-ivory/35 sm:w-56"
                  aria-label="Your email"
                />
                <button
                  type="submit"
                  className="group flex items-center gap-2 text-[11px] font-medium uppercase tracking-luxe-sm text-gold transition-colors hover:text-[#D8BC8A]"
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom — copyright */}
      <div className="mt-16 border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-8 text-[11px] uppercase tracking-luxe-sm text-ivory/40 sm:flex-row sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} V36 Suites Athens. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold/40" />
            Boutique Luxury · Athens
          </span>
        </div>
      </div>
    </footer>
  );
}
