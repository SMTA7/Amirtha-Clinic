"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, MapPin, ChevronDown, ShieldCheck, Clock, Sparkles } from "lucide-react";

// Dynamic import for the 3D visual layer to ensure fast initial page load and 90+ Lighthouse score
const MedicalHeroVisual = dynamic(
  () => import("@/components/3d/MedicalHeroVisual"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-95 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-teal-800/10 blur-2xl animate-pulse" />
      </div>
    ),
  }
);

export function HeroSection() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-svh pt-24 lg:pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-linear-to-b from-teal-50/50 via-offwhite to-offwhite"
    >
      {/* Subtle organic background ambient gradient blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-212.5 h-112.5 bg-linear-to-tr from-teal-200/25 via-emerald-100/20 to-amber-100/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-20 right-0 w-100 h-100 bg-teal-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10 text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 backdrop-blur-md shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-semibold tracking-wide text-teal-950 uppercase">
                {t("hero.badge")}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-6">
              <span>{t("hero.titleLine1")}</span>{" "}
              <span className="text-gradient-teal block sm:inline">
                {t("hero.titleLine2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-600 font-normal max-w-2xl mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* Key Quick Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-9 text-xs sm:text-sm font-medium text-stone-700">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>24×7 Emergency Care</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>Veeracholan • Perunali • Vembar • Narikkudi • Potakavayal • Nainarkovil</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#appointment"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-stone-900 font-bold text-base shadow-lg shadow-amber-500/25 gold-gradient hover:brightness-105 active:scale-95 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 text-stone-950" />
                <span>{t("hero.ctaBook")}</span>
              </a>

              <a
                href="#branches"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-stone-800 font-semibold text-base bg-white/80 hover:bg-white border border-teal-800/15 shadow-sm hover:shadow-md hover:border-teal-700/30 transition-all duration-300 active:scale-95"
              >
                <MapPin className="w-5 h-5 text-teal-700" />
                <span>{t("hero.ctaBranches")}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Hero 3D Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Subtle floating glass badge near 3D emblem */}
            <div className="relative w-full max-w-125">
              <MedicalHeroVisual />

              {/* Float badge 1: 24/7 Care (Only 24x7 Available, no branch names) */}
              <div className="absolute top-8 right-2 sm:right-6 glass-card px-3.5 py-2.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-stone-900 pr-1">
                  {locale === "ta" ? "24×7 சேவை" : "24×7 Available"}
                </p>
              </div>

              {/* Float badge 2: Community trust */}
              <div className="absolute bottom-6 left-2 sm:left-4 glass-card px-4 py-2.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-600/15 flex items-center justify-center text-teal-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-stone-900">Top-Rated Care</p>
                  <p className="text-[10px] text-stone-500">Trusted by Local Families</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex flex-col items-center justify-center pt-8 pb-2 text-stone-400">
        <a
          href="#trust"
          aria-label={t("hero.scrollDown")}
          className="flex flex-col items-center gap-1.5 group transition-colors hover:text-teal-700"
        >
          <span className="text-xs font-medium text-stone-500 group-hover:text-teal-700 tracking-wider">
            {t("hero.scrollDown")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-teal-700" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
