import React from "react";
import Image from "next/image";

export function AboutSection() {
  const diningImage =
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1200&auto=format&fit=crop";
  const nookImage =
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop";

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute right-4 bottom-10 select-none pointer-events-none opacity-5 hidden sm:block">
        <span className="font-display text-[260px] font-bold text-[#1E1E1E]">AG</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Arched Dining Room Image with "Thoughtful Living" cursive tag */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            
            {/* Floating Cursive Script Accent - Positioned safely within bounds */}
            <div className="absolute -top-6 left-2 sm:-left-4 z-20 pointer-events-none select-none transition-transform duration-500 hover:scale-105">
              <div className="transform -rotate-6">
                <span className="font-script text-3xl sm:text-5xl text-[#C5A065] drop-shadow-sm block leading-none">
                  Thoughtful
                </span>
                <span className="font-script text-2xl sm:text-4xl text-[#1E1E1E] -mt-1 ml-4 block leading-none">
                  Living
                </span>
              </div>
            </div>

            {/* Arched Image Container */}
            <div
              data-animate="arch-reveal"
              className="relative w-full aspect-[3.6/5] rounded-t-[160px] sm:rounded-t-[200px] rounded-b-2xl overflow-hidden border border-[#E8E2D6] shadow-xl group bg-[#F0ECE4]"
            >
              <Image
                src={diningImage}
                alt="AG Interior Dining Space Architecture"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>

          {/* Right Column: About Content, Secondary Image & Badges */}
          <div data-animate="fade-up" className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag / Kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-[#C5A065]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
                About AG Interior
              </span>
              <span className="h-px w-6 bg-[#C5A065]" />
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.18] text-[#1E1E1E] font-medium tracking-tight mb-5 sm:mb-6">
              Creating Environments <br className="hidden sm:inline" />
              for a Better Everyday.
            </h2>

            {/* Paragraph Description */}
            <p className="font-sans text-[#5E5950] leading-relaxed text-sm sm:text-base mb-6 sm:mb-8 max-w-xl font-light">
              At AG Interior, we believe great design goes beyond beauty. It&apos;s about creating spaces that inspire, comfort, and elevate your everyday life. With a focus on quality, functionality, and timeless aesthetics, we bring your vision to life with precision and passion.
            </p>

            {/* Handwritten Signature */}
            <div className="mb-8 sm:mb-10">
              <span className="font-script text-4xl sm:text-5xl text-[#1E1E1E]/85 block leading-tight">
                AG Interior
              </span>
              <span className="block text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-[#A09A8F] mt-1">
                Founder & Lead Architect
              </span>
            </div>

            {/* Lower Composition: Secondary Image + Badges */}
            <div data-animate="fade-up" className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-6 border-t border-[#EAE4D9]">
              
              {/* Secondary Armchair Image */}
              <div className="sm:col-span-5 relative aspect-[4/4.8] max-w-[220px] sm:max-w-none rounded-xl overflow-hidden border border-[#E2DBD0] shadow-md group bg-[#F0ECE4]">
                <Image
                  src={nookImage}
                  alt="AG Interior Reading Nook & Lighting"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 220px, 240px"
                />
              </div>

              {/* Badges & Credo */}
              <div className="sm:col-span-7 flex items-center gap-6 sm:gap-8">
                
                {/* Circular Badge: SPACES PEOPLE LOVE DELIVER */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#D5CEC2] p-1 flex items-center justify-center bg-white/90 shadow-sm flex-shrink-0 group hover:rotate-12 transition-transform duration-700">
                  <div className="w-full h-full rounded-full border border-dashed border-[#C5A065]/60 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[7.5px] sm:text-[8px] font-sans uppercase tracking-[0.2em] text-[#6B655B] font-semibold leading-tight">
                      SPACES
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] font-sans uppercase tracking-[0.2em] text-[#C5A065] font-bold leading-tight my-0.5">
                      PEOPLE
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-sans uppercase tracking-[0.2em] text-[#6B655B] font-semibold leading-tight">
                      LOVE DELIVER
                    </span>
                  </div>
                </div>

                {/* Stacked Vertical Accent: DESIGN PLAN EXECUTE DELIVER */}
                <div className="flex flex-col space-y-1.5 border-l border-[#E2DBD0] pl-4 sm:pl-5">
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A065] font-semibold">
                    DESIGN
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#4A4640] font-medium">
                    PLAN
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#4A4640] font-medium">
                    EXECUTE
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A065] font-semibold">
                    DELIVER
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
