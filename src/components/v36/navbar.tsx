"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoldButton } from "./primitives/section";
import { EASE_LUXE, DUR } from "./primitives/anim";

const NAV_LINKS = [
  { label: "Suites", href: "#suites" },
  { label: "Location", href: "#explore-athens" },
  { label: "Benefits", href: "#benefits" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const overHero = !scrolled;

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(248,246,242,0.85)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          borderColor: scrolled ? "rgba(30,30,30,0.08)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: DUR.base, ease: EASE_LUXE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b",
          scrolled ? "glass" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Wordmark */}
          <a
            href="#top"
            className={cn(
              "font-display text-xl tracking-tight transition-colors duration-500 sm:text-2xl",
              overHero ? "text-ivory" : "text-charcoal"
            )}
            aria-label="V36 Suites Athens — home"
          >
            <span className="font-medium">V36</span>
            <span className="ml-1.5 text-[0.55em] uppercase tracking-luxe-sm align-middle">
              Suites
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "group relative text-[12px] font-medium uppercase tracking-luxe-sm transition-colors duration-500",
                    overHero
                      ? "text-ivory/85 hover:text-gold"
                      : "text-charcoal/80 hover:text-gold"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500",
                      "bg-gold group-hover:w-full"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <GoldButton
              variant={overHero ? "outline" : "solid"}
              className={cn(
                "border-gold py-3",
                overHero && "border-ivory/40 text-ivory hover:border-gold hover:text-gold"
              )}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Book Your Stay
            </GoldButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex h-11 w-11 items-center justify-center transition-colors duration-500 lg:hidden",
              overHero ? "text-ivory" : "text-charcoal"
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : DUR.base, ease: EASE_LUXE }}
            className="fixed inset-0 z-[60] bg-charcoal text-ivory lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-[72px] items-center justify-between px-5">
                <span className="font-display text-xl">
                  <span className="font-medium">V36</span>
                  <span className="ml-1.5 text-[0.55em] uppercase tracking-luxe-sm align-middle">
                    Suites
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center text-ivory"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 pt-8">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: DUR.base,
                        ease: EASE_LUXE,
                        delay: 0.1 + i * 0.06,
                      }}
                      className="border-b border-white/10"
                    >
                      <a
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between py-6 font-display text-3xl tracking-tight text-ivory transition-colors hover:text-gold"
                      >
                        {l.label}
                        <span className="text-[11px] font-sans uppercase tracking-luxe-sm text-gold/70">
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR.base, ease: EASE_LUXE, delay: 0.5 }}
                  className="mt-10"
                >
                  <GoldButton variant="solid" className="w-full">
                    Book Your Stay
                  </GoldButton>
                </motion.div>
              </nav>

              <div className="border-t border-white/10 px-5 py-6 text-[12px] uppercase tracking-luxe-sm text-ivory/50">
                Boutique Luxury in the Heart of Athens
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
