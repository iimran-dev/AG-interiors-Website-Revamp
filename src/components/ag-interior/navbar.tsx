"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { NAV_LINKS } from "./data";
import { ArrowRight, Menu, X, Phone } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.04)] py-3 border-b border-[#EBE6DC]"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left Side: Logo and Navigation links stay completely inside the cream half */}
        <div className="flex items-center space-x-6 sm:space-x-8 lg:space-x-12">
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs lg:text-[13px] font-sans font-medium text-[#2E2C29] tracking-wider hover:text-[#C5A065] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A065] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenConsultation}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D7B174] via-[#C8A265] to-[#B89053] text-[#1E1E1E] text-xs font-semibold tracking-wider shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1E1E1E] hover:bg-[#EAE4D9] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8E2D6] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2E2C29] hover:text-[#C5A065] transition-colors py-1.5 border-b border-[#EFEBE3]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#C5A065] text-[#1E1E1E] text-xs font-semibold tracking-wider uppercase shadow-md"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="tel:+919585544446"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#D5CEC2] text-xs font-medium text-[#1E1E1E]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A065]" />
              <span>+91 95855 44446</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
