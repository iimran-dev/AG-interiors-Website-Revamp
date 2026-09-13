"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

interface DreamSpaceCTAProps {
  onOpenConsultation: () => void;
}

export function DreamSpaceCTA({ onOpenConsultation }: DreamSpaceCTAProps) {
  const leftFoliage =
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop";
  const rightFoliage =
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop";

  return (
    <section className="relative bg-[#161514] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      
      {/* Decorative Left Foliage Mask */}
      <div
        data-animate="parallax"
        className="absolute top-0 bottom-0 left-0 w-1/4 sm:w-1/5 pointer-events-none opacity-20 sm:opacity-30 overflow-hidden"
      >
        <div className="relative w-full h-[120%] -top-[10%]">
          <Image
            src={leftFoliage}
            alt="Interior Botanical Greenery"
            fill
            className="object-cover object-left"
            sizes="300px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#161514]/75 to-[#161514]" />
        </div>
      </div>

      {/* Decorative Right Foliage Mask */}
      <div
        data-animate="parallax"
        className="absolute top-0 bottom-0 right-0 w-1/4 sm:w-1/5 pointer-events-none opacity-20 sm:opacity-30 overflow-hidden"
      >
        <div className="relative w-full h-[120%] -top-[10%]">
          <Image
            src={rightFoliage}
            alt="Interior Botanical Greenery"
            fill
            className="object-cover object-right"
            sizes="300px"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#161514]/75 to-[#161514]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center justify-between">
          
          {/* Left: Headline & Description */}
          <div data-animate="fade-up" className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF7F2] mb-4 sm:mb-5">
              Let&apos;s Design Your <br />
              Dream Space
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B3ACA0] font-light max-w-xl leading-relaxed">
              Whether it&apos;s your home or workspace, we&apos;re here to bring your vision to life. Book a free consultation and take the first step towards a more beautiful tomorrow.
            </p>
          </div>

          {/* Right: CTA Button & Phone Call Link */}
          <div data-animate="fade-up" className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-4 sm:gap-5">
            <button
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A065] via-[#D5B075] to-[#B58E52] text-[#1E1E1E] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:opacity-95 transition-all duration-300 shadow-xl active:scale-[0.98] w-full sm:w-auto overflow-hidden"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="tel:+919585544446"
              className="inline-flex items-center justify-center gap-3 text-sm sm:text-base text-[#FAF7F2] hover:text-[#C5A065] transition-colors py-1 group"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-[#C5A065] group-hover:bg-[#C5A065]/10 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                <Phone className="w-4 h-4 text-[#C5A065]" />
              </div>
              <span className="font-sans font-medium tracking-wide">
                +91 95855 44446
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
