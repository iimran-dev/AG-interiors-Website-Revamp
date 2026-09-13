"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./anim";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Eyebrow — small gold, tracked-out label                            */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe font-medium",
        dark ? "text-gold" : "text-gold",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          dark ? "bg-gold/60" : "bg-gold/60"
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading — editorial display title with eyebrow              */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  dark = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal variant={fadeUpAlias}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display text-balance text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]",
            dark ? "text-ivory" : "text-charcoal",
            titleClassName
          )}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

import { fadeUp as fadeUpAlias } from "./anim";

/* ------------------------------------------------------------------ */
/*  Divider — thin gold hairline                                       */
/* ------------------------------------------------------------------ */

export function GoldDivider({ className }: { className?: string }) {
  return (
    <span
      className={cn("block h-px w-full divider-gold opacity-60", className)}
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/*  GoldButton — primary CTA, slow hover                               */
/* ------------------------------------------------------------------ */

export function GoldButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  type = "button",
  variant = "solid",
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline" | "ghost";
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[12px] font-medium uppercase tracking-luxe-sm transition-all duration-500 overflow-hidden";
  const styles = {
    solid:
      "bg-gold text-charcoal hover:bg-[#B8915A] shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]",
    outline:
      "border border-charcoal/25 text-charcoal hover:border-gold hover:text-gold",
    ghost: "text-charcoal hover:text-gold",
  }[variant];

  if (as === "a") {
    return (
      <a href={href} className={cn(base, styles, className)}>
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {children}
        </span>
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(base, styles, className)}>
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  GhostLink — text link with thin underline grow                      */
/* ------------------------------------------------------------------ */

export function GhostLink({
  children,
  href,
  onClick,
  dark = false,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  dark?: boolean;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-luxe-sm transition-colors duration-500",
    dark ? "text-ivory/80 hover:text-gold" : "text-charcoal/80 hover:text-gold",
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className="relative h-px w-6 overflow-hidden bg-current opacity-40 transition-all duration-500 group-hover:w-10 group-hover:opacity-100">
        <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
