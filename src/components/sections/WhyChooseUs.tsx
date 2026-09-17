"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Clock, BadgePercent, HeartHandshake, ShieldCheck } from "lucide-react";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      id: "item1",
      icon: MapPin,
      titleKey: "why.item1.title",
      descKey: "why.item1.desc",
      accent: "teal",
    },
    {
      id: "item2",
      icon: Clock,
      titleKey: "why.item2.title",
      descKey: "why.item2.desc",
      accent: "gold",
    },
    {
      id: "item3",
      icon: BadgePercent,
      titleKey: "why.item3.title",
      descKey: "why.item3.desc",
      accent: "teal",
    },
    {
      id: "item4",
      icon: HeartHandshake,
      titleKey: "why.item4.title",
      descKey: "why.item4.desc",
      accent: "teal",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-linear-to-b from-offwhite via-teal-50/20 to-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
              {t("why.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t("why.title")}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t("why.subtitle")}
          </p>
        </div>

        {/* 4 Column Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            const isGold = feat.accent === "gold";

            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`p-7 rounded-3xl glass-card flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  isGold
                    ? "border-amber-400/40 bg-linear-to-b from-white/90 to-amber-50/30"
                    : "border-white/80 hover:border-teal-700/30"
                }`}
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      isGold
                        ? "bg-amber-500/15 text-amber-700"
                        : "bg-teal-700/10 text-teal-800"
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-3 leading-snug">
                    {t(feat.titleKey)}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {t(feat.descKey)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                  <span>Community Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
