"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn, getAssetUrl } from "@/lib/utils";
import { EASE_LUXE, DUR } from "./anim";

/* ------------------------------------------------------------------ */
/*  ImageReveal — clip-path mask reveal on enter                       */
/* ------------------------------------------------------------------ */

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
  overlay = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  overlay?: boolean;
}) {
  const reduce = useReducedMotion();
  const assetUrl = getAssetUrl(src);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!reduce ? (
        <motion.img
          src={assetUrl}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          className={cn("h-full w-full object-cover", imgClassName)}
          initial={{ clipPath: "inset(8% 0 92% 0)", scale: 1.12, opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DUR.slow, ease: EASE_LUXE }}
        />
      ) : (
        <img
          src={assetUrl}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
      {overlay && (
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"
          aria-hidden
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ParallaxImage — subtle vertical parallax on scroll                  */
/* ------------------------------------------------------------------ */

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 60,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const assetUrl = getAssetUrl(src);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}px`, `${amount}px`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {reduce ? (
        <img
          src={assetUrl}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <motion.img
          src={assetUrl}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          style={{ y }}
          className={cn("absolute inset-0 h-[120%] w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HoverZoom — subtle image scale on hover wrapper                     */
/* ------------------------------------------------------------------ */

export function HoverZoom({
  src,
  alt,
  className,
  imgClassName,
  zoom = 1.05,
  eager = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoom?: number;
  eager?: boolean;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const assetUrl = getAssetUrl(src);
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      {reduce ? (
        <img
          src={assetUrl}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <motion.img
          src={assetUrl}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          className={cn("h-full w-full object-cover", imgClassName)}
          initial={{ scale: 1 }}
          whileHover={{ scale: zoom }}
          transition={{ duration: 1.2, ease: EASE_LUXE }}
        />
      )}
      {children}
    </div>
  );
}

