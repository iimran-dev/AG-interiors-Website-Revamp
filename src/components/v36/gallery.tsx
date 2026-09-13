"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { useState } from "react";
import { GALLERY, type GalleryItem } from "@/data";
import { Eyebrow, GhostLink } from "./primitives/section";
import { Reveal, fadeUp, stagger } from "./primitives/anim";
import { cn } from "@/lib/utils";

function GalleryCard({
  item,
  className,
  onOpen,
}: {
  item: GalleryItem;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group relative h-[300px] sm:h-[340px] lg:h-[360px] w-full overflow-hidden rounded-2xl bg-charcoal shadow-sm transition-all duration-500 hover:shadow-2xl cursor-pointer",
        className
      )}
      onClick={onOpen}
    >
      <img
        src={item.image}
        alt={item.caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Category & Expand Icon Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-full bg-charcoal/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-md">
          {item.category}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/60 text-ivory backdrop-blur-md transition-transform group-hover:scale-110">
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Footer Title */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 transition-transform duration-300">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold/90 sm:hidden">
          {item.category}
        </span>
        <p className="mt-1 font-display text-base sm:text-lg leading-snug text-ivory text-balance font-medium">
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}

function Lightbox({
  image,
  caption,
  onClose,
}: {
  image: string;
  caption: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/95 p-4 sm:p-8 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ivory transition-colors hover:bg-gold hover:text-charcoal cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>
      <motion.figure
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl bg-charcoal shadow-2xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={caption}
          className="max-h-[75vh] w-auto rounded-xl object-contain mx-auto"
        />
        <figcaption className="mt-3 text-center text-[12px] font-medium uppercase tracking-[0.16em] text-ivory/80 pb-2">
          {caption}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export function Gallery() {
  const [lightbox, setLightbox] = useState<{ image: string; caption: string } | null>(null);

  return (
    <section id="gallery" className="relative bg-ivory py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>The Gallery</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.06] tracking-tight text-charcoal text-balance">
                Athens, the suites,
                <br />
                <span className="italic font-normal text-gold">in detail.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[14px] leading-[1.85] text-charcoal/65 text-pretty md:text-right">
              A small portfolio — interiors, architecture, the city, the table —
              composed as an editorial spread.
            </p>
          </Reveal>
        </div>

        {/* Modern Editorial Bento Grid — No Filter Buttons, Zero Empty Gaps */}
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Row 1: 2 cols + 1 col = 3 cols */}
          <GalleryCard
            item={GALLERY[0]}
            className="lg:col-span-2"
            onOpen={() => setLightbox({ image: GALLERY[0].image, caption: GALLERY[0].caption })}
          />
          <GalleryCard
            item={GALLERY[1]}
            className="lg:col-span-1"
            onOpen={() => setLightbox({ image: GALLERY[1].image, caption: GALLERY[1].caption })}
          />

          {/* Row 2: 1 col + 1 col + 1 col = 3 cols */}
          <GalleryCard
            item={GALLERY[2]}
            className="lg:col-span-1"
            onOpen={() => setLightbox({ image: GALLERY[2].image, caption: GALLERY[2].caption })}
          />
          <GalleryCard
            item={GALLERY[3]}
            className="lg:col-span-1"
            onOpen={() => setLightbox({ image: GALLERY[3].image, caption: GALLERY[3].caption })}
          />
          <GalleryCard
            item={GALLERY[4]}
            className="lg:col-span-1"
            onOpen={() => setLightbox({ image: GALLERY[4].image, caption: GALLERY[4].caption })}
          />

          {/* Row 3: 1 col + 2 cols = 3 cols */}
          <GalleryCard
            item={GALLERY[5]}
            className="lg:col-span-1"
            onOpen={() => setLightbox({ image: GALLERY[5].image, caption: GALLERY[5].caption })}
          />
          <GalleryCard
            item={GALLERY[6]}
            className="lg:col-span-2"
            onOpen={() => setLightbox({ image: GALLERY[6].image, caption: GALLERY[6].caption })}
          />

          {/* Row 4: 1 col + 2 cols = 3 cols */}
          <GalleryCard
            item={GALLERY[7]}
            className="lg:col-span-1"
            onOpen={() => setLightbox({ image: GALLERY[7].image, caption: GALLERY[7].caption })}
          />
          <GalleryCard
            item={GALLERY[8]}
            className="lg:col-span-2"
            onOpen={() => setLightbox({ image: GALLERY[8].image, caption: GALLERY[8].caption })}
          />
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <GhostLink href="#instagram">More on Instagram</GhostLink>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            image={lightbox.image}
            caption={lightbox.caption}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
