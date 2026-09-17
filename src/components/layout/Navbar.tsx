"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, PhoneCall, Calendar, MapPin, Clock } from "lucide-react";

export function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#branches", label: t("nav.branches") },
    { href: "#services", label: t("nav.services") },
    { href: "#doctors", label: t("nav.doctors") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-md shadow-teal-900/5"
          : "bg-linear-to-b from-stone-900/10 via-transparent to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="#home"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="Amritha Clinic Home"
          >
            <div className="relative w-44 sm:w-52 h-11">
              <Image
                src="/logo.svg"
                alt="Amritha Clinic"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-700 hover:text-teal-800 font-medium text-sm lg:text-[15px] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-700 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar: Language Toggle + CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Toggle Pill Switch */}
            <div
              className="flex items-center p-1 rounded-full bg-stone-200/70 backdrop-blur-md border border-stone-300/60 shadow-inner"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                  locale === "en"
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                aria-pressed={locale === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("ta")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                  locale === "ta"
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                aria-pressed={locale === "ta"}
              >
                தமிழ்
              </button>
            </div>

            {/* Book Appointment CTA button */}
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-stone-900 font-semibold text-sm shadow-md shadow-amber-500/20 transition-all duration-300 gold-gradient hover:brightness-105 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-900" />
              <span>{t("nav.bookAppointment")}</span>
            </a>
          </div>

          {/* Mobile Menu & Language Pill */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Compact Mobile Language Switch */}
            <button
              onClick={() => setLocale(locale === "en" ? "ta" : "en")}
              className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-800/10 text-teal-900 border border-teal-800/20"
              aria-label="Toggle language"
            >
              {locale === "en" ? "தமிழ்" : "EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-800 hover:bg-stone-200/50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden glass-nav border-t border-stone-200/80 px-6 py-6 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-stone-800 hover:text-teal-800 font-semibold text-base py-1"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
                <a
                  href="#appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-stone-900 gold-gradient shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  {t("nav.bookAppointment")}
                </a>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    24×7 Emergency Care Available
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    5+ Care Branches
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
