"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { DOCTORS_DATA } from "@/data/doctors";
import {
  Clock,
  Award,
  CheckCircle2,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Calendar,
} from "lucide-react";

export function DoctorsSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="doctors" className="py-24 bg-linear-to-b from-[#f8faf9] via-white to-[#f4f7f5] relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
              {t("doctors.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t("doctors.title")}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6">
            {t("doctors.subtitle")}
          </p>

          {/* Quick Credibility Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-stone-700">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-stone-200/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{locale === "ta" ? "முதுநிலை மருத்துவ நிபுணர்கள்" : "MBBS & MD Specialist Faculty"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-stone-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{locale === "ta" ? "அரசு பதிவு பெற்ற மருத்துவர்கள்" : "Govt. Registered Practitioners"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-stone-200/80 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              <span>{locale === "ta" ? "24 மணி நேர தீவிர சிகிச்சை" : "24×7 Emergency Care Available"}</span>
            </span>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
          {DOCTORS_DATA.map((doctor, index) => {
            const docName = locale === "ta" ? doctor.nameTamil : doctor.name;
            const docRoleBadge = locale === "ta" ? doctor.roleBadgeTamil : doctor.roleBadge;
            const docSpecialty = locale === "ta" ? doctor.specialtyTamil : doctor.specialty;
            const docAvailability = locale === "ta" ? doctor.availabilityTamil : doctor.availability;

            return (
              <motion.article
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group glass-card rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border border-stone-200/80 bg-white hover:border-teal-700/30"
              >
                <div>
                  {/* Card Header: Role Badge + Govt Reg No */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-900/5 text-teal-950 border border-teal-800/15">
                        {docRoleBadge}
                      </span>
                      {doctor.regNo && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{locale === "ta" ? "பதிவு எண்" : "Reg No"}: {doctor.regNo}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Doctor Avatar / Medical Insignia */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-20 h-20 rounded-2xl p-1 bg-linear-to-tr from-teal-700 via-teal-600 to-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-[14px] bg-linear-to-b from-teal-900 to-teal-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial from-teal-400/20 via-transparent to-transparent opacity-70" />
                        <Stethoscope className="w-5 h-5 text-teal-200 mb-0.5" />
                        <span className="text-sm font-black tracking-wider text-amber-300">
                          {doctor.avatarInitials}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Name & Qualification */}
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-teal-800 transition-colors tracking-tight leading-snug">
                      {docName}
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-teal-800 bg-teal-50 border border-teal-100 mt-1">
                      {doctor.qualification}
                    </div>
                  </div>

                  {/* Specialty Description */}
                  <p className="text-xs text-stone-600 text-center leading-relaxed font-medium min-h-9.5 mb-4 px-1">
                    {docSpecialty}
                  </p>

                  {/* Clinical Availability Scope */}
                  <div className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50/90 py-2.5 px-3 rounded-xl mb-3 border border-stone-100">
                    <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="font-semibold text-stone-800 text-[11px] leading-snug">
                      {docAvailability}
                    </span>
                  </div>

                  {/* Genuine Verification Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <span className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-50/90 border border-emerald-200/70 py-1.5 px-2 rounded-lg text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{locale === "ta" ? "அரசு அங்கீகாரம்" : "Govt. Verified"}</span>
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-teal-900 bg-teal-50/90 border border-teal-200/70 py-1.5 px-2 rounded-lg text-center">
                      <Stethoscope className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>{locale === "ta" ? "நேரடி ஆலோசனை" : "OPD Consult"}</span>
                    </span>
                  </div>
                </div>

                {/* Direct Appointment Booking Action Button */}
                <a
                  href="#appointment"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-sm shadow-teal-900/10 transition-all active:scale-95 text-center cursor-pointer group/btn"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-200 shrink-0 group-hover/btn:scale-110 transition-transform" />
                  <span>{locale === "ta" ? "மருத்துவரை சந்திக்க முன்பதிவு" : "Book Consultation"}</span>
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Note on visiting specialists */}
        <div className="mt-14 text-center">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-600 bg-white border border-stone-200/80 px-5 py-2.5 rounded-full shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{t("doctors.visitingNote")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
