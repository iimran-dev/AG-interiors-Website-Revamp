import { Navbar } from "@/components/v36/navbar";
import { Hero } from "@/components/v36/hero";
import { BrandStory } from "@/components/v36/brand-story";
import { SuiteShowcase } from "@/components/v36/suite-showcase";
import { ExploreAthens } from "@/components/v36/explore-athens";
import { DestinationStory } from "@/components/v36/destination-story";
import { BookingBenefits } from "@/components/v36/booking-benefits";
import { GuestReviews } from "@/components/v36/guest-reviews";
import { Experiences } from "@/components/v36/experiences";
import { Gallery } from "@/components/v36/gallery";
import { Faq } from "@/components/v36/faq";
import { Newsletter, InstagramFeed } from "@/components/v36/newsletter-instagram";
import { Footer } from "@/components/v36/footer";
import { AIConcierge } from "@/components/v36/concierge";
import { StickyCTA } from "@/components/v36/sticky-cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* DESTINATION → ATMOSPHERE → PROPERTY */}
        <Hero />
        {/*<BrandStory />*/}

        {/* SUITES */}
        <SuiteShowcase />

        {/* ATHENS EXPERIENCE */}
        <ExploreAthens />
        
        {/*<DestinationStory />*/}

        {/* DIRECT BOOKING BENEFITS */}
        <BookingBenefits />

        {/* CURATED EXPERIENCES */}
        <Experiences />

        {/* GALLERY */}
        <Gallery />

        {/* SOCIAL PROOF */}
        <GuestReviews />

        {/* FAQ */}
        <Faq />

        {/* NEWSLETTER + INSTAGRAM */}
        <Newsletter />
        <InstagramFeed />
      </main>

      <Footer />

      {/* Floating AI Concierge + mobile sticky CTA */}
      <AIConcierge />
      <StickyCTA />
    </div>
  );
}
