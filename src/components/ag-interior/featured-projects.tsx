"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "./data";

interface FeaturedProjectsProps {
  onOpenConsultation: () => void;
}

const CATEGORIES = ["All", "Residential", "Commercial", "Kitchens", "Living", "Bedrooms"] as const;

export function FeaturedProjects({ onOpenConsultation }: FeaturedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = PROJECTS.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  // Main featured card
  const heroProject = filtered[0] || PROJECTS[0];
  // Supporting cards
  const gridProjects = filtered.length > 1 ? filtered.slice(1) : PROJECTS.filter((p) => p.id !== heroProject.id).slice(0, 4);

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] border-t border-[#ECE7DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div data-animate="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-14">
          
          {/* Left: Kicker, Title, Subtitle & View All Button */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C5A065] font-semibold">
                Featured Projects
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight text-[#1E1E1E] font-medium tracking-tight mb-3 sm:mb-4">
              Spaces That Inspire
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#666159] max-w-md font-light mb-6">
              A glimpse into our latest residential and commercial projects.
            </p>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A065] text-[#1E1E1E] text-xs font-semibold tracking-wider uppercase hover:bg-[#B58E52] transition-colors shadow-sm active:scale-95"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Filter Tabs & Tagline */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-between h-full pt-4 lg:pt-0">
            
            {/* Tagline */}
            <div className="hidden lg:block mb-6 text-right">
              <span className="font-display italic text-lg sm:text-xl text-[#C5A065]">
                Creating Better Everydays
              </span>
            </div>

            {/* Filter Tabs with animated layout pill */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative text-xs font-sans tracking-wider py-1.5 px-3.5 rounded-full transition-colors duration-200 z-10 ${
                      isActive ? "text-white font-medium" : "text-[#6B655B] hover:text-[#1E1E1E]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[#1E1E1E] rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute inset-0 bg-white/80 border border-[#E2DBD0] rounded-full -z-20 hover:bg-[#ECE6DC] transition-colors" />
                    )}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Bento Grid with Framer Motion fluid layout */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Card (Modern Villa, Chennai) */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroProject.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="lg:col-span-6 group relative aspect-[4/3.2] sm:aspect-[4/3] lg:aspect-auto min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] rounded-2xl overflow-hidden shadow-md border border-[#E8E2D6] bg-[#EDE7DD]"
            >
              <Image
                src={heroProject.image}
                alt={heroProject.title}
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Content Bottom Bar */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 flex items-end justify-between z-10">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-medium">
                    {heroProject.title}
                  </h3>
                  {heroProject.location && (
                    <p className="font-sans text-xs sm:text-sm text-[#E5DFD4] font-light mt-1">
                      {heroProject.location}
                    </p>
                  )}
                </div>

                {/* Circular Arrow Action Button */}
                <button
                  onClick={onOpenConsultation}
                  className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#C5A065] group-hover:border-[#C5A065] transition-all duration-300 flex-shrink-0 ml-3"
                  aria-label={`Explore ${heroProject.title}`}
                >
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 2x2 Grid Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
            <AnimatePresence mode="popLayout">
              {gridProjects.slice(0, 4).map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative aspect-[4/3] sm:aspect-[4/3.1] rounded-xl overflow-hidden shadow-sm border border-[#E8E2D6] bg-[#EDE7DD]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                    <div>
                      <h4 className="font-display text-base sm:text-lg text-white font-medium">
                        {project.title}
                      </h4>
                      {project.location && (
                        <p className="font-sans text-[11px] text-white/80 font-light mt-0.5">
                          {project.location}
                        </p>
                      )}
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C5A065] transition-colors duration-300 flex-shrink-0 ml-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
