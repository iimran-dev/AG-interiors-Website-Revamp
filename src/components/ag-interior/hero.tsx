"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetUrl } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenVideo: () => void;
}

export function Hero({ onOpenConsultation, onOpenVideo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial" | "turnkey">("residential");
  const [activeStep, setActiveStep] = useState("01");

  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wallTextRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const heroImage = getAssetUrl("/images/hero-living-room.jpg");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(kickerRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(headlineRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
        .fromTo(paraRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(archRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }, "-=0.9")
        .fromTo(wallTextRef.current, { opacity: 0, x: 25 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6")
        .fromTo(pillRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

      // Subtle scroll parallax on the living room photo
      if (imageRef.current && heroRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen pt-24 lg:pt-0 bg-[#FBF9F4] text-[#1E1E1E] overflow-hidden flex flex-col lg:flex-row items-stretch"
    >
      {/* ================= LEFT EDITORIAL COLUMN ================= */}
      <div className="w-full lg:w-[53%] flex flex-col justify-between pt-12 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 px-6 sm:px-10 lg:pl-12 lg:pr-6 xl:pl-20 xl:pr-10 z-10">
        
        {/* Top spacer for navbar on desktop */}
        <div className="hidden lg:block h-6" />

        {/* Content Body */}
        <div className="max-w-xl">
          {/* Kicker / Subhead */}
          <div ref={kickerRef} className="flex items-center gap-2.5 mb-5">
            <span className="h-[1.5px] w-6 bg-[#C5A065]" />
            <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
              Interiors That Feel Like Home
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 ref={headlineRef} className="font-display text-4xl sm:text-5xl lg:text-[56px] xl:text-[66px] leading-[1.08] text-[#1E1E1E] font-medium tracking-tight mb-6">
            Design <br />
            Beyond Spaces. <br />
            <span className="italic font-normal text-[#C5A065] drop-shadow-sm">
              For a Better You.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p ref={paraRef} className="font-sans text-sm sm:text-base lg:text-[17px] text-[#5A5650] leading-relaxed mb-8 sm:mb-10 font-light max-w-lg">
            Thoughtfully designed residential and commercial interiors that blend aesthetics, functionality and your unique lifestyle.
          </p>

          {/* CTA Buttons Row */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
            {/* Primary Golden Bronze Button */}
            <Link
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A87932] via-[#C59A52] to-[#B3853E] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-300 active:scale-[0.98] overflow-hidden"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Video Play Trigger */}
            <button
              onClick={onOpenVideo}
              className="group inline-flex items-center gap-3 text-xs sm:text-sm font-sans font-medium text-[#2E2C29] hover:text-[#C5A065] transition-colors py-1"
              aria-label="Watch AG Interior Story Video"
            >
              <div className="w-11 h-11 rounded-full border border-[#D5CEC2] flex items-center justify-center bg-white shadow-sm group-hover:border-[#C5A065] group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                <Play className="w-4 h-4 text-[#1E1E1E] fill-[#1E1E1E] ml-0.5 group-hover:text-[#C5A065] group-hover:fill-[#C5A065] transition-colors" />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-[#1E1E1E] leading-tight group-hover:text-[#C5A065] transition-colors">Watch Our Story</span>
                <span className="block text-[11px] text-[#7A756D] font-normal">2 min</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Rail: Pagination Indicators & Scroll Cue */}
        <div className="pt-6 border-t border-[#EAE3D5] flex items-center justify-between max-w-xl">
          {/* Step numbers: 01, 02, 03, ○, 0 */}
          <div className="flex items-center gap-5 text-xs font-sans tracking-widest text-[#9E988E]">
            {["01", "02", "03"].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`transition-all duration-300 ${
                  activeStep === step
                    ? "text-[#C5A065] font-bold scale-110"
                    : "hover:text-[#4A463F]"
                }`}
              >
                {step}
              </button>
            ))}
            <span className="w-2 h-2 rounded-full border border-[#C5A065] inline-block" />
            <span className="hover:text-[#4A463F] cursor-pointer">0</span>
          </div>

          {/* Scroll Cue */}
          <div className="flex items-center gap-2.5 text-[10px] font-sans uppercase tracking-[0.22em] text-[#8C867C]">
            <span className="font-semibold text-[#4A463F]">SCROLL</span>
            <span className="text-[#C5A065] lowercase tracking-normal">to explore</span>
            <div className="h-5 w-[1.5px] bg-[#C5A065] animate-pulse ml-0.5" />
          </div>
        </div>

      </div>

      {/* ================= RIGHT ARCHITECTURAL LIVING ROOM COLUMN ================= */}
      <div className="w-full lg:w-[47%] relative min-h-[480px] sm:min-h-[580px] lg:min-h-full flex items-stretch overflow-hidden">
        
        {/* Grand Sweeping Golden Arch Container */}
        <div
          ref={archRef}
          className="relative w-full h-full lg:rounded-tl-[380px] overflow-hidden border-t-2 lg:border-t-0 lg:border-l-4 border-[#C5A065] shadow-2xl bg-[#EDE7DC]"
        >
          
          {/* Parallax Image Wrapper */}
          <div ref={imageRef} className="absolute -top-10 -bottom-10 inset-x-0 w-full h-[115%]">
            <Image
              src={heroImage}
              alt="AG Interior Luxury Living Room Showcase"
              fill
              priority
              className="object-cover object-center scale-100 lg:scale-[1.02] hover:scale-105 transition-transform duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Delicate Warm Ambient Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

          {/* Wall Badge Text: SPACES PEOPLE LOVE LIVING IN */}
          <div
            ref={wallTextRef}
            className="absolute top-44 sm:top-52 lg:top-64 xl:top-72 right-6 sm:right-10 z-20 pointer-events-none select-none text-right"
          >
            <div className="flex flex-col space-y-1 text-xs sm:text-[13px] font-sans font-semibold tracking-[0.26em] text-white/95 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              <span>SPACES</span>
              <span>PEOPLE</span>
              <span>LOVE</span>
              <span className="text-[#EAD5AA]">LIVING IN</span>
            </div>
          </div>

          {/* Category Selector Pill (Bottom-Right) */}
          <div ref={pillRef} className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-20">
            <div className="bg-[#181716]/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/15 shadow-2xl flex items-center gap-3 sm:gap-4 text-xs font-sans tracking-wide">
              <button
                onClick={() => setActiveTab("residential")}
                className={`transition-colors duration-200 ${
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
                className={`transition-colors duration-200 ${
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
                className={`transition-colors duration-200 ${
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
    </section>
  );
}
