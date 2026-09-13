"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { LANDMARKS } from "@/data";
import { Reveal } from "./primitives/anim";
import { cn } from "@/lib/utils";

const AthensLeafletMap = dynamic(
  () => import("./athens-leaflet-map"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full animate-pulse rounded-2xl bg-stone/40 border border-charcoal/10 flex items-center justify-center text-charcoal/50 text-xs font-semibold uppercase tracking-wider">
        Loading Central Athens Map...
      </div>
    ),
  }
);

export function ExploreAthens() {
  const [activeId, setActiveId] = useState<string>("acropolis");
  const [showAll, setShowAll] = useState<boolean>(false);

  const listLandmarks = LANDMARKS.filter((l) => l.id !== "v36");
  const displayedLandmarks = showAll ? listLandmarks : listLandmarks.slice(0, 5);

  const scrollToMap = () => {
    const el = document.getElementById("explore-athens-map");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="explore-athens" className="relative bg-[#FBF9F5] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column — Content */}
          <div className="lg:col-span-4 flex flex-col justify-center pr-0 lg:pr-4">
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B58E58]">
                EXPLORE ATHENS
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.12] tracking-tight text-charcoal text-balance">
                Everything is
                <br />
                just around you
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[14px] sm:text-[15px] leading-[1.75] text-charcoal/70 text-pretty">
                Our suites are perfectly located in the historic center of Athens. Discover iconic landmarks, charming streets and unforgettable experiences all within walking distance.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={scrollToMap}
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#B58E58] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#9E7A47] hover:shadow-md active:scale-95 cursor-pointer"
                >
                  EXPLORE THE MAP
                </button>
              </div>
            </Reveal>
          </div>

          {/* Center Column — Interactive Leaflet Map */}
          <div id="explore-athens-map" className="lg:col-span-5">
            <Reveal delay={0.1}>
              <AthensLeafletMap
                activeId={activeId}
                onSelectLandmark={(id) => setActiveId(id)}
              />
            </Reveal>
          </div>

          {/* Right Column — Landmark List Card */}
          <div className="lg:col-span-3">
            <Reveal delay={0.15}>
              <div className="flex h-[420px] flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-2 shadow-sm sm:p-3">
                <div className="divide-y divide-gray-100 overflow-y-auto scrollbar-hidden">
                  {displayedLandmarks.map((lm) => {
                    const isActive = lm.id === activeId;
                    return (
                      <button
                        key={lm.id}
                        type="button"
                        onClick={() => setActiveId(lm.id)}
                        className={cn(
                          "group flex w-full items-center justify-between px-4 py-4 text-left transition-colors duration-200 rounded-lg cursor-pointer",
                          isActive
                            ? "bg-[#FBF9F5]"
                            : "hover:bg-gray-50/80"
                        )}
                      >
                        <span
                          className={cn(
                            "font-display text-[15px] sm:text-[16px] transition-colors duration-200",
                            isActive ? "font-semibold text-charcoal" : "text-charcoal/80 group-hover:text-charcoal"
                          )}
                        >
                          {lm.name}
                        </span>
                        <span
                          className={cn(
                            "text-[12px] font-normal transition-colors duration-200 whitespace-nowrap",
                            isActive ? "text-[#B58E58] font-medium" : "text-gray-500"
                          )}
                        >
                          {lm.walkMinutes} min walk
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom link: VIEW ALL PLACES */}
                <div className="border-t border-gray-100 px-4 pt-3.5 pb-2 text-right">
                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B58E58] transition-all hover:text-[#9E7A47] group cursor-pointer"
                  >
                    <span>{showAll ? "SHOW LESS" : "VIEW ALL PLACES"}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
