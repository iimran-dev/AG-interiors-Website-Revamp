"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CalendarDays } from "lucide-react";
import { EASE_LUXE, DUR } from "./primitives/anim";

/** Mobile sticky CTA bar — Book Your Stay + WhatsApp */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (approx 600px)
      setShow(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: DUR.base, ease: EASE_LUXE }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-charcoal/10 bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden"
        >
          <a
            href="https://wa.me/302101234567"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-12 w-12 shrink-0 items-center justify-center border border-charcoal/15 text-charcoal transition-colors hover:border-gold hover:text-gold"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 bg-gold py-3.5 text-[12px] font-medium uppercase tracking-luxe-sm text-charcoal transition-colors duration-500 hover:bg-[#B8915A]"
          >
            <CalendarDays className="h-4 w-4" />
            Book Your Stay
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
