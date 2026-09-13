import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getAssetUrl } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "gold" | "dark" | "white";
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const dimensions = {
    sm: { width: 110, height: 60, imgClass: "h-12 w-auto" },
    md: { width: 140, height: 75, imgClass: "h-16 w-auto" },
    lg: { width: 180, height: 95, imgClass: "h-20 w-auto" },
    xl: { width: 220, height: 115, imgClass: "h-24 w-auto" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center justify-center group select-none ${className}`}
      aria-label="AG Interior Home"
    >
      <div className="relative transition-transform duration-300 group-hover:scale-105">
        <Image
          src={getAssetUrl("/images/ag-official-logo-transparent.png")}
          alt="AG Interior Official Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className={`${dimensions.imgClass} object-contain`}
        />
      </div>
    </Link>
  );
}
