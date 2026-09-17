"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BRANCHES_DATA, Branch } from "@/data/branches";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  MapPin,
  Clock,
  Navigation,
  CheckCircle,
  Phone,
  PhoneCall,
  Calendar,
  ArrowRight,
} from "lucide-react";

export function BranchesSection() {
  const { t, locale } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "24x7" | "day">("all");

  const filteredBranches = BRANCHES_DATA.filter((b) => {
    if (activeFilter === "24x7") return b.is24Hours;
    if (activeFilter === "day") return !b.is24Hours;
    return true;
  });

  const countTotal = BRANCHES_DATA.length;
  const count24x7 = BRANCHES_DATA.filter((b) => b.is24Hours).length;
  const countDay = BRANCHES_DATA.filter((b) => !b.is24Hours).length;

  const getWhatsAppLink = (branch: Branch) => {
    const text = encodeURIComponent(
      `Hello Amritha Clinic (${branch.name}), I would like to inquire about consultation and timings.`
    );
    const targetNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || branch.whatsappNumber;
    return `https://wa.me/${targetNumber}?text=${text}`;
  };

  const handleBookAppointment = (branchId: string) => {
    if (typeof window !== "undefined") {
      // 1. Dispatch custom event so AppointmentSection selects this branch immediately
      window.dispatchEvent(new CustomEvent("select-branch", { detail: branchId }));

      // 2. Set hash for anchor navigation
      if (window.history.pushState) {
        window.history.pushState(null, "", `#appointment?branch=${branchId}`);
      } else {
        window.location.hash = `#appointment?branch=${branchId}`;
      }

      // 3. Smoothly scroll down to #appointment
      const appointmentEl = document.getElementById("appointment");
      if (appointmentEl) {
        appointmentEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="branches" className="py-24 bg-[#f8faf9] relative">
      {/* Background accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-teal-800/15 to-transparent" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
            <MapPin className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
              {t("branches.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t("branches.title")}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t("branches.subtitle")}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-teal-700/30"
              }`}
            >
              {t("branches.allFilter")} ({countTotal})
            </button>
            <button
              onClick={() => setActiveFilter("24x7")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === "24x7"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-amber-600/30"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {t("branches.emergencyFilter")} ({count24x7})
            </button>
            <button
              onClick={() => setActiveFilter("day")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === "day"
                  ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-teal-700/30"
              }`}
            >
              {t("branches.dayFilter")} ({countDay})
            </button>
          </div>
        </div>

        {/* Branch Cards Grid (6 Cards in 3 Columns on desktop: 3 24x7 + 3 Day Clinics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBranches.map((branch, index) => {
            const hasMapSupport = branch.hasMap !== false && !!branch.mapsUrl;
            const branchName = locale === "ta" ? branch.nameTamil : branch.name;
            const branchAddress = locale === "ta" ? branch.addressTamil : branch.address;
            const branchHours = locale === "ta" ? branch.hoursTamil : branch.hours;
            const features = locale === "ta" ? branch.featuresTamil : branch.features;
            const locationName = branchName.includes("—")
              ? branchName.split("—")[1].trim()
              : branchName;
            const phoneNumbers = branch.phone.split("/").map((p) => p.trim());
            const primaryPhone = phoneNumbers[0] || branch.phone;

            return (
              <motion.article
                key={branch.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-3xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-600/40 transition-all duration-300 flex flex-col justify-between bg-white relative"
              >
                <div>
                  {/* Top Brand Accent Line */}
                  <div className="h-1.5 w-full bg-linear-to-r from-teal-700 via-emerald-500 to-teal-800" />

                  {/* Featured Branch Flex Banner (Full 1983x793 Aspect Ratio - 100% Uncropped) */}
                  <div className="relative w-full aspect-1983/793 bg-stone-50 overflow-hidden border-b border-stone-200/70">
                    <Image
                      src={branch.image}
                      alt={branchName}
                      width={1983}
                      height={793}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      priority={index < 2}
                    />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 sm:p-6">
                    {/* Location Badge + Care Status Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/5 border border-teal-800/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                        <span className="text-[11px] font-extrabold text-teal-950 uppercase tracking-wider">
                          {locationName}
                        </span>
                      </div>
                      {branch.is24Hours ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-linear-to-r from-amber-500/15 to-amber-600/20 text-amber-900 border border-amber-500/40 shadow-2xs">
                          <Clock className="w-3 h-3 text-amber-600" />
                          {locale === "ta" ? "24 மணி நேர சேவை" : "24×7 Care"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          {locale === "ta" ? "பகல் கிளினிக்" : "Day Clinic"}
                        </span>
                      )}
                    </div>

                    {/* Premium Branch Name - Refined Text Size */}
                    <h3 className="text-base sm:text-[17px] font-bold text-stone-900 tracking-tight leading-snug mb-2 group-hover:text-teal-950 transition-colors">
                      {branchName}
                    </h3>

                    {/* Full Address */}
                    <div className="flex items-start gap-2 text-stone-600 text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <p className="leading-relaxed line-clamp-2">{branchAddress}</p>
                    </div>

                    {/* Operating Hours Box */}
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-linear-to-r from-teal-50/70 to-emerald-50/40 border border-teal-100/90 text-stone-800 text-xs mb-3">
                      <div className="w-5 h-5 rounded-md bg-teal-100/80 flex items-center justify-center shrink-0">
                        <Clock className="w-3 h-3 text-teal-800" />
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-stone-600 text-[11px]">{t("branches.hoursLabel")}:</span>
                        <span className={branch.is24Hours ? "font-bold text-teal-950" : "font-medium text-stone-900"}>
                          {branchHours}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Direct Phone & Helpline Strip (Click to Call without extra bottom button) */}
                    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-stone-50 hover:bg-teal-50/60 border border-stone-200/80 transition-colors text-xs mb-3 group/call">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover/call:bg-teal-800 transition-colors">
                          <Phone className="w-3 h-3" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                            {locale === "ta" ? "நேரடி உதவி எண்:" : "Direct Helpline:"}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {phoneNumbers.map((phoneStr, pIdx) => {
                              const cleanTel = phoneStr.replace(/[^0-9+]/g, "");
                              return (
                                <a
                                  key={pIdx}
                                  href={`tel:${cleanTel}`}
                                  className="font-bold text-teal-950 hover:text-teal-700 hover:underline transition-colors text-xs"
                                  title={`Call ${phoneStr}`}
                                >
                                  {phoneStr}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <a
                        href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold shadow-xs transition-all active:scale-95"
                        title={locale === "ta" ? "மருத்துவரை அழைக்க" : "Call Clinic"}
                      >
                        <PhoneCall className="w-3 h-3 text-teal-200" />
                        <span>{locale === "ta" ? "அழைக்க" : "Call"}</span>
                      </a>
                    </div>

                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100/90 text-stone-700 border border-stone-200/60"
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2-Tier Pro Action Buttons */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3.5 border-t border-stone-100 flex flex-col gap-2.5 bg-stone-50/40">
                  {/* Tier 1: Prominent Primary Action - Book Appointment with Auto-Select */}
                  <button
                    type="button"
                    onClick={() => handleBookAppointment(branch.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-teal-700 via-teal-800 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-950/15 hover:shadow-lg hover:shadow-teal-950/25 transition-all duration-200 active:scale-[0.98] cursor-pointer group/book"
                  >
                    <Calendar className="w-4 h-4 text-emerald-300 shrink-0 group-hover/book:scale-110 transition-transform" />
                    <span>{t("branches.bookAppointment")}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-200 shrink-0 group-hover/book:translate-x-1 transition-transform ml-0.5" />
                  </button>

                  {/* Tier 2: Secondary Navigation & Chat Actions */}
                  {hasMapSupport ? (
                    <div className="grid grid-cols-2 gap-2">
                      {/* Button 1: Get Directions */}
                      <a
                        href={branch.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 font-semibold text-xs transition-all active:scale-95 text-center shadow-2xs"
                      >
                        <Navigation className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="truncate">{t("branches.getDirections")}</span>
                      </a>

                      {/* Button 2: WhatsApp This Branch */}
                      <a
                        href={getWhatsAppLink(branch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white bg-[#25D366] hover:bg-[#20ba5a] font-bold text-xs shadow-2xs transition-all active:scale-95 text-center"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
                        <span className="truncate">{t("branches.whatsappBranch")}</span>
                      </a>
                    </div>
                  ) : (
                    /* Veeracholan: Full-width WhatsApp button */
                    <a
                      href={getWhatsAppLink(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white bg-[#25D366] hover:bg-[#20ba5a] font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95 text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>{t("branches.whatsappBranch")} (24×7 Direct Chat)</span>
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
