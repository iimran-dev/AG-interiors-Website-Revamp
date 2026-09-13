"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ag-interior/navbar";
import { Hero } from "@/components/ag-interior/hero";
import { StatsBar } from "@/components/ag-interior/stats-bar";
import { AboutSection } from "@/components/ag-interior/about-section";
import { ServicesSection } from "@/components/ag-interior/services-section";
import { BeforeAfterSection } from "@/components/ag-interior/before-after-section";
import { FeaturedProjects } from "@/components/ag-interior/featured-projects";
import { ProcessSection } from "@/components/ag-interior/process-section";
import { TestimonialsSection } from "@/components/ag-interior/testimonials-section";
import { DreamSpaceCTA } from "@/components/ag-interior/dream-space-cta";
import { Footer } from "@/components/ag-interior/footer";
import { MotionWrapper } from "@/components/ag-interior/motion-wrapper";
import { ConsultationModal } from "@/components/ag-interior/consultation-modal";
import { VideoModal } from "@/components/ag-interior/video-modal";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const handleOpenConsultation = () => setConsultationOpen(true);
  const handleCloseConsultation = () => setConsultationOpen(false);

  const handleOpenVideo = () => setVideoOpen(true);
  const handleCloseVideo = () => setVideoOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#1E1E1E] antialiased selection:bg-[#C5A065] selection:text-[#1E1E1E] overflow-x-hidden w-full">
      {/* 1. Header & Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      <MotionWrapper>
        <main className="flex-1">
          {/* 2. Hero Section with Arched Living Showcase */}
          <Hero
            onOpenConsultation={handleOpenConsultation}
            onOpenVideo={handleOpenVideo}
          />

          {/* 3. 4-Column Trust Stats Bar */}
          <StatsBar />

          {/* 4. About AG Interior with Arched Dining Room & Badges */}
          <AboutSection />

          {/* 5. Complete Interior Solutions (4 Service Cards) */}
          <ServicesSection onSelectService={() => handleOpenConsultation()} />

          {/* 6. Interactive Before & After Transformation Slider */}
          <BeforeAfterSection />

          {/* 7. Featured Projects Bento Grid with Category Filter Tabs */}
          <FeaturedProjects onOpenConsultation={handleOpenConsultation} />

          {/* 8. 5-Step Process Roadmap */}
          <ProcessSection />

          {/* 9. Client Testimonial & Atmosphere */}
          <TestimonialsSection />

          {/* 10. Let's Design Your Dream Space (Framed Greenery CTA) */}
          <DreamSpaceCTA onOpenConsultation={handleOpenConsultation} />
        </main>

        {/* 11. Luxury Arched Footer */}
        <Footer />
      </MotionWrapper>

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={handleCloseConsultation}
      />
      <VideoModal
        isOpen={videoOpen}
        onClose={handleCloseVideo}
      />
    </div>
  );
}
