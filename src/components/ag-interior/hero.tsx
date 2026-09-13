"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenVideo: () => void;
}

export function Hero({ onOpenConsultation, onOpenVideo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial" | "turnkey">("residential");
  const [activeStep, setActiveStep] = useState("01");

  const heroImage =
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1600&auto=format&fit=crop";

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-[#FAF8F5] flex items-center"
    >
      {/* Subtle architectural background ambiance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EBE4D5]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#DFD6C3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Content & Micro-indicators) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Tag / Kicker */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-[#C5A065]" />
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
                Interiors That Feel Like Home
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] xl:text-[66px] leading-[1.08] text-[#1E1E1E] font-medium tracking-tight mb-6">
              Design <br />
              Beyond Spaces. <br />
              <span className="italic font-normal text-[#C5A065]">
                For a Better You.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="font-sans text-base sm:text-lg text-[#5A5650] max-w-lg leading-relaxed mb-8 sm:mb-10 font-light">
              Thoughtfully designed residential and commercial interiors that blend aesthetics, functionality and your unique lifestyle.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C5A065] text-[#1E1E1E] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:bg-[#B58E52] transition-all duration-300 active:scale-[0.98]"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenVideo}
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-sans font-medium text-[#2E2C29] hover:text-[#C5A065] transition-colors py-2"
                aria-label="Watch AG Interior story video"
              >
                <div className="w-10 h-10 rounded-full border border-[#C5A065]/60 flex items-center justify-center bg-white/80 group-hover:bg-[#C5A065] group-hover:border-[#C5A065] transition-all duration-300 shadow-sm">
                  <Play className="w-3.5 h-3.5 text-[#1E1E1E] fill-[#1E1E1E] group-hover:text-white group-hover:fill-white ml-0.5 transition-colors" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold">Watch Our Story</span>
                  <span className="block text-[11px] text-[#7A756D] font-normal">(1:30)</span>
                </div>
              </button>
            </div>

            {/* Bottom Left Indicators & Scroll cue */}
            <div className="pt-6 border-t border-[#E8E2D6] flex items-center justify-between max-w-md">
              {/* Step indicator pagination */}
              <div className="flex items-center gap-4">
                {["01", "02", "03", "04"].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveStep(step)}
                    className={`text-xs font-sans tracking-wider transition-all duration-300 ${
                      activeStep === step
                        ? "text-[#C5A065] font-bold scale-110"
                        : "text-[#9E988E] hover:text-[#5A5650]"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C867C]">
                <span>SCROLL</span>
                <span className="text-[9px] text-[#C5A065] lowercase tracking-normal">to explore</span>
                <span className="h-4 w-px bg-[#C5A065]/60 animate-pulse" />
              </div>
            </div>

          </div>

          {/* Right Column (Arched Showcase Window) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Top Right Floating Badge */}
            <div className="absolute -top-3 sm:-top-5 right-2 sm:right-6 z-20 pointer-events-none select-none">
              <div className="bg-[#FAF8F5]/90 backdrop-blur-md px-3.5 py-4 rounded-xl border border-[#E5DFD4] shadow-sm flex flex-col items-center">
                <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#33312E] font-medium leading-tight writing-vertical text-center">
                  SPACES PEOPLE LOVE LIVING IN
                </span>
              </div>
            </div>

            {/* Arched Window Outer Frame */}
            <div className="relative w-full max-w-[480px] lg:max-w-[530px] aspect-[4/5] rounded-t-[220px] rounded-b-3xl p-3 sm:p-4 bg-gradient-to-b from-[#EAE3D6] to-[#FAF8F5] border border-[#E2DAD0] shadow-2xl">
              
              {/* Arched Inner Container */}
              <div className="relative w-full h-full rounded-t-[200px] rounded-b-2xl overflow-hidden group">
                <Image
                  src={heroImage}
                  alt="AG Interior Luxury Living Room Architecture"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 550px"
                />

                {/* Soft ambient lighting gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />

                {/* Bottom Overlay Category Selector Pill */}
                <div className="absolute bottom-5 left-4 right-4 z-10 flex justify-center">
                  <div className="bg-[#181716]/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-3 text-[11px] font-sans tracking-wide">
                    <button
                      onClick={() => setActiveTab("residential")}
                      className={`transition-colors ${
                        activeTab === "residential"
                          ? "text-[#C5A065] font-semibold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      Residential
                    </button>
                    <span className="text-white/30">|</span>
                    <button
                      onClick={() => setActiveTab("commercial")}
                      className={`transition-colors ${
                        activeTab === "commercial"
                          ? "text-[#C5A065] font-semibold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      Commercial
                    </button>
                    <span className="text-white/30">|</span>
                    <button
                      onClick={() => setActiveTab("turnkey")}
                      className={`transition-colors ${
                        activeTab === "turnkey"
                          ? "text-[#C5A065] font-semibold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      Turnkey Interiors
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
