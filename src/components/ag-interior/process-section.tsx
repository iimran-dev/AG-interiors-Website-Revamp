import React from "react";
import { ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "./data";

export function ProcessSection() {
  return (
    <section id="process" className="py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] border-t border-[#ECE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div data-animate="fade-up" className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#C5A065]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
              Our Process
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#1E1E1E] font-medium tracking-tight">
            From Vision to Reality. <br />
            A Seamless Journey.
          </h2>
        </div>

        {/* 5-Step Responsive Flow */}
        <div
          data-animate="stagger-group"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 lg:gap-4 relative"
        >
          {PROCESS_STEPS.map((item, index) => (
            <div
              key={item.step}
              data-animate="stagger-item"
              className="flex flex-col relative group bg-white/50 lg:bg-transparent p-5 lg:p-0 rounded-xl lg:rounded-none border border-[#EAE3D5] lg:border-none shadow-sm lg:shadow-none hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Top Row: Step Number & Connector Arrow */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-[#C5A065] group-hover:scale-110 group-hover:text-[#A87932] transition-all duration-300">
                  {item.step}
                </span>

                {/* Arrow connector for desktop */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center flex-1 mx-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-[#C5A065]/70 to-[#C5A065]/20" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A065]/80 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-base sm:text-lg font-medium text-[#1E1E1E] group-hover:text-[#C5A065] transition-colors mb-1.5">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#736E65] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
