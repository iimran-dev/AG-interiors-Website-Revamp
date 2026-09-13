import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Facebook } from "lucide-react";

export function Footer() {
  const archImage =
    "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=600&auto=format&fit=crop";

  return (
    <footer id="contact" className="bg-[#FAF8F5] pt-14 sm:pt-20 pb-12 border-t border-[#ECE7DF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div data-animate="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 sm:mb-14">
          
          {/* Col 1: Brand & Slogan (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <Logo size="md" className="!items-start mb-4" />
            <p className="font-display italic text-sm text-[#706B62] mt-2 max-w-xs leading-relaxed">
              Thoughtful Spaces <br />
              for a Better Tomorrow.
            </p>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold text-[#1E1E1E] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#6B655B]">
              <li>
                <Link href="#hero" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  About
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold text-[#1E1E1E] uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#6B655B]">
              <li>
                <Link href="#services" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Home Interiors
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Modular Kitchens
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Wardrobes
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  False Ceilings
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#C5A065] transition-colors inline-block py-0.5">
                  Commercial Interiors
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold text-[#1E1E1E] uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-[#6B655B]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A065] flex-shrink-0 mt-0.5" />
                <span>
                  Jonas The Downs Avenue, <br />
                  Chennai, India 600127
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A065] flex-shrink-0" />
                <a
                  href="tel:+919585544446"
                  className="hover:text-[#C5A065] transition-colors"
                >
                  +91 95855 44446
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A065] flex-shrink-0" />
                <a
                  href="mailto:aginteriorofficial@gmail.com"
                  className="hover:text-[#C5A065] transition-colors"
                >
                  aginteriorofficial@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#D5CEC2] flex items-center justify-center text-[#555] hover:border-[#C5A065] hover:text-[#C5A065] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919585544446"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#D5CEC2] flex items-center justify-center text-[#555] hover:border-[#C5A065] hover:text-[#C5A065] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#D5CEC2] flex items-center justify-center text-[#555] hover:border-[#C5A065] hover:text-[#C5A065] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 5: Arched Decorative Photo & Script Text (2 cols) */}
          <div className="lg:col-span-2 flex items-center gap-4 sm:col-span-2 lg:justify-end">
            {/* Arched small frame */}
            <div
              data-animate="arch-reveal"
              className="relative w-20 sm:w-24 h-32 sm:h-36 rounded-t-full rounded-b-lg overflow-hidden border border-[#DFD8CC] shadow-sm flex-shrink-0 bg-[#F0ECE4]"
            >
              <Image
                src={archImage}
                alt="Botanical Architecture Decor"
                fill
                className="object-cover object-center"
                sizes="120px"
              />
            </div>

            {/* Cursive Tag: Design Live Belong */}
            <div className="flex flex-col space-y-1">
              <span className="font-script text-2xl text-[#C5A065] leading-none">
                Design
              </span>
              <span className="font-script text-2xl text-[#1E1E1E] leading-none">
                Live
              </span>
              <span className="font-script text-2xl text-[#C5A065] leading-none">
                Belong
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#8C867C] gap-3 text-center sm:text-left">
          <p>© 2025 AG Interior. All rights reserved.</p>
          <p className="font-display italic text-[#C5A065]">
            Interiors for a Better You.
          </p>
        </div>

      </div>
    </footer>
  );
}
