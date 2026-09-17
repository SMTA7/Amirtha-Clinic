"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Stethoscope,
  Activity,
  Baby,
  Pill,
  HeartHandshake,
  Scissors,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export function ServicesSection() {
  const { t } = useLanguage();

  // Configurable array of services
  const services = [
    {
      id: "generalMedicine",
      titleKey: "services.generalMedicine.title",
      descKey: "services.generalMedicine.desc",
      icon: Stethoscope,
      badge: "Routine Care",
      accent: "teal",
    },
    {
      id: "emergencyCare",
      titleKey: "services.emergencyCare.title",
      descKey: "services.emergencyCare.desc",
      icon: Activity,
      badge: "24×7 Available",
      accent: "gold",
    },
    {
      id: "maternalCare",
      titleKey: "services.maternalCare.title",
      descKey: "services.maternalCare.desc",
      icon: Baby,
      badge: "Family Health",
      accent: "teal",
    },
    {
      id: "pharmacy",
      titleKey: "services.pharmacy.title",
      descKey: "services.pharmacy.desc",
      icon: Pill,
      badge: "Instant Access",
      accent: "teal",
    },
    {
      id: "chronicCare",
      titleKey: "services.chronicCare.title",
      descKey: "services.chronicCare.desc",
      icon: HeartHandshake,
      badge: "Preventive Care",
      accent: "teal",
    },
    {
      id: "minorSurgery",
      titleKey: "services.minorSurgery.title",
      descKey: "services.minorSurgery.desc",
      icon: Scissors,
      badge: "Day Care",
      accent: "teal",
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
            <ShieldAlert className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
              {t("services.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t("services.title")}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEmergency = service.accent === "gold";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`group glass-card rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  isEmergency
                    ? "border-amber-400/40 hover:border-amber-400/80 bg-linear-to-br from-white/90 via-white/80 to-amber-50/40"
                    : "border-white/80 hover:border-teal-700/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isEmergency
                          ? "bg-amber-500/15 text-amber-700"
                          : "bg-teal-700/10 text-teal-800"
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isEmergency
                          ? "bg-amber-100 text-amber-900 border border-amber-300/60"
                          : "bg-teal-50 text-teal-800 border border-teal-200/60"
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-teal-800 transition-colors">
                    {t(service.titleKey)}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {t(service.descKey)}
                  </p>
                </div>

                <a
                  href="#appointment"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 group-hover:text-teal-900 transition-colors mt-auto pt-4 border-t border-stone-100"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
