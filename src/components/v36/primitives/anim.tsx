"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Shared easing & durations — slow, deliberate, expensive            */
/* ------------------------------------------------------------------ */

export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

export const DUR = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
  hero: 0.9,
} as const;

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_LUXE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.slow, ease: EASE_SOFT } },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.hero, ease: EASE_LUXE },
  },
};

export const slideRevealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EASE_LUXE },
  },
};

export const slideRevealRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EASE_LUXE },
  },
};

/* Stagger container */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/* ------------------------------------------------------------------ */
/*  Reveal — fade-up on scroll into view                               */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  variant = fadeUp,
  as = "div",
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variants;
  as?: "div" | "section" | "span" | "li" | "p" | "h2" | "h3";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }
  return (
    <MotionTag
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger group                                                      */
/* ------------------------------------------------------------------ */

export function StaggerGroup({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={stagger(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
