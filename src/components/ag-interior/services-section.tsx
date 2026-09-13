"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "./data";

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#ECE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#C5A065]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
              Our Services
            </span>
            <span className="h-px w-6 bg-[#C5A065]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#1E1E1E] font-medium tracking-tight">
            Complete Interior Solutions <br className="hidden sm:inline" />
            Under One Roof.
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-white rounded-2xl p-3 border border-[#E8E2D6] hover:border-[#C5A065]/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Card Image Container with rounded inner corners */}
              <div className="relative aspect-[4/3.2] w-full rounded-xl overflow-hidden mb-4 bg-[#F2EDE4]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Footer: Title, Description & Arrow Button */}
              <div className="px-2 pb-2 flex items-center justify-between mt-auto">
                <div>
                  <h3 className="font-display text-lg font-medium text-[#1E1E1E] group-hover:text-[#C5A065] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-[#7A756C] font-light mt-0.5">
                    {service.description}
                  </p>
                </div>

                {/* Circular Arrow Button */}
                <button
                  onClick={() => onSelectService?.(service.title)}
                  className="w-9 h-9 rounded-full border border-[#DFD8CC] flex items-center justify-center text-[#1E1E1E] group-hover:border-[#C5A065] group-hover:bg-[#C5A065] group-hover:text-white transition-all duration-300 flex-shrink-0 ml-2"
                  aria-label={`View details for ${service.title}`}
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
