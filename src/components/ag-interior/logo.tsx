import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "gold" | "dark" | "white";
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", variant = "gold", size = "md" }: LogoProps) {
  const goldColor = "#C5A065";
  const darkColor = "#1A1918";
  const whiteColor = "#FFFFFF";

  const mainColor =
    variant === "white" ? whiteColor : variant === "dark" ? darkColor : goldColor;

  const sizeClasses = {
    sm: { circle: 38, fontSize: 10, brandSize: "text-[11px]" },
    md: { circle: 48, fontSize: 13, brandSize: "text-xs" },
    lg: { circle: 64, fontSize: 18, brandSize: "text-sm" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center justify-center group select-none ${className}`}
      aria-label="AG Interior Home"
    >
      {/* Circular Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={sizeClasses.circle}
          height={sizeClasses.circle}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke={mainColor}
            strokeWidth="2"
            strokeOpacity="0.85"
          />
          {/* Inner subtle decorative ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={mainColor}
            strokeWidth="0.75"
            strokeDasharray="2 3"
            strokeOpacity="0.4"
          />

          {/* Letter A */}
          <text
            x="36"
            y="62"
            fontFamily="var(--font-playfair), Georgia, serif"
            fontSize="42"
            fontWeight="500"
            fontStyle="italic"
            fill={mainColor}
            textAnchor="middle"
          >
            A
          </text>

          {/* Letter G - entwined */}
          <text
            x="60"
            y="65"
            fontFamily="var(--font-playfair), Georgia, serif"
            fontSize="46"
            fontWeight="400"
            fill={mainColor}
            textAnchor="middle"
            fillOpacity="0.9"
          >
            G
          </text>

          {/* Small accent diamond below letters */}
          <path
            d="M50 78 L52 80 L50 82 L48 80 Z"
            fill={mainColor}
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="mt-1.5 flex items-center gap-1.5">
        <span
          className="h-[1px] w-3"
          style={{ backgroundColor: mainColor, opacity: 0.5 }}
        />
        <span
          className={`font-sans font-medium tracking-[0.24em] uppercase text-center transition-colors duration-300 ${sizeClasses.brandSize}`}
          style={{ color: variant === "white" ? whiteColor : "#242220" }}
        >
          AG INTERIOR
        </span>
        <span
          className="h-[1px] w-3"
          style={{ backgroundColor: mainColor, opacity: 0.5 }}
        />
      </div>
    </Link>
  );
}
