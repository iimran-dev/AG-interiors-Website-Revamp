"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

export function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Before image: raw concrete construction / bare room
  const beforeImage =
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1400&auto=format&fit=crop";
  // After image: luxury furnished warm interior living space
  const afterImage =
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1400&auto=format&fit=crop";

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#161514] text-white relative overflow-hidden">
      
      {/* Delicate golden ambient glow */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#C5A065]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Badge */}
          <div className="lg:col-span-4 xl:col-span-4">
            
            {/* Kicker */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-[#C5A065]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
                Living Transformation
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.16] font-medium tracking-tight mb-5 text-[#F5F2EB]">
              See the Transformation <br />
              Before It Happens.
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[#A8A296] text-sm sm:text-base leading-relaxed mb-8 font-light">
              Move the slider to see how we turn ordinary spaces into extraordinary living experiences.
            </p>

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-sans tracking-widest text-[#E6E1D8] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A065] animate-pulse" />
              <span>Interactive 3D Craft</span>
            </div>

          </div>

          {/* Right Column: Interactive Slider Container */}
          <div className="lg:col-span-8 xl:col-span-8 relative">
            
            {/* Top Right Floating Calligraphy */}
            <div className="absolute -top-10 sm:-top-12 right-2 sm:right-6 z-20 pointer-events-none select-none">
              <span className="font-script text-3xl sm:text-4xl text-[#C5A065]/90 tracking-wide drop-shadow">
                Same Space, Different Story
              </span>
            </div>

            {/* Interactive Image Container */}
            <div
              ref={containerRef}
              onMouseDown={() => {
                isDragging.current = true;
              }}
              onMouseUp={() => {
                isDragging.current = false;
              }}
              onMouseLeave={() => {
                isDragging.current = false;
              }}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/15"
            >
              {/* "AFTER" Image (Full background layer) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={afterImage}
                  alt="After: Luxury Furnished Interior"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 850px"
                  priority
                />
                {/* AFTER Pill Label */}
                <div className="absolute bottom-5 right-5 z-10 px-3.5 py-1 rounded-full bg-[#181716]/80 backdrop-blur-md border border-white/20 text-[10px] font-sans font-semibold tracking-widest text-[#C5A065] uppercase">
                  AFTER
                </div>
              </div>

              {/* "BEFORE" Image (Clipped overlay layer) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}>
                  <Image
                    src={beforeImage}
                    alt="Before: Unfinished Raw Space"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 850px"
                  />
                  {/* Subtle dark tint for raw room */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* BEFORE Pill Label */}
                  <div className="absolute bottom-5 left-5 z-10 px-3.5 py-1 rounded-full bg-[#181716]/80 backdrop-blur-md border border-white/20 text-[10px] font-sans font-semibold tracking-widest text-[#E5E0D5] uppercase">
                    BEFORE
                  </div>
                </div>
              </div>

              {/* Draggable Divider Line & Circular Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-20 flex items-center justify-center -ml-0.5"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Circle Button with Left/Right Arrows */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#181716] shadow-2xl flex items-center justify-center border-2 border-[#C5A065] transform transition-transform hover:scale-110 active:scale-95">
                  <svg
                    className="w-5 h-5 text-[#181716]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                    <polyline points="9 18 3 12 9 6" />
                    <polyline points="15 6 21 12 15 18" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Bottom cue for touch devices */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-sans text-[#8C867C]">
              <span>← Slide horizontally to view the before & after transformation →</span>
              <span className="text-[#C5A065]">{Math.round(sliderPosition)}% Finished</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
