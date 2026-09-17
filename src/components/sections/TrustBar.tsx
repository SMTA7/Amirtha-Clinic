"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Building2, Clock, Award, Users } from "lucide-react";

function CounterItem({
  value,
  suffix = "",
  label,
  desc,
  icon: Icon,
  accentColor = "teal",
}: {
  value: number;
  suffix?: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: "teal" | "gold";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1600; // ms
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="flex items-start gap-4 p-5 rounded-2xl glass-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          accentColor === "gold"
            ? "bg-amber-500/15 text-amber-700"
            : "bg-teal-700/10 text-teal-800"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {displayValue}
          </span>
          <span className="text-2xl font-bold text-teal-700">{suffix}</span>
        </div>
        <p className="text-sm font-bold text-stone-800 mt-0.5">{label}</p>
        <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export function TrustBar() {
  const { t } = useLanguage();

  return (
    <section id="trust" className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 1. Branches */}
        <CounterItem
          value={5}
          suffix="+"
          label={t("trust.branchesLabel")}
          desc={t("trust.branchesDesc")}
          icon={Building2}
          accentColor="teal"
        />

        {/* 2. 24x7 Care */}
        <div className="flex items-start gap-4 p-5 rounded-2xl glass-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-amber-500/15 text-amber-700">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                24×7
              </span>
            </div>
            <p className="text-sm font-bold text-stone-800 mt-0.5">{t("trust.emergencyLabel")}</p>
            <p className="text-xs text-stone-500 mt-0.5">{t("trust.emergencyDesc")}</p>
          </div>
        </div>

        {/* 3. Years */}
        <CounterItem
          value={15}
          suffix="+"
          label={t("trust.yearsLabel")}
          desc={t("trust.yearsDesc")}
          icon={Award}
          accentColor="gold"
        />

        {/* 4. Doctors */}
        <CounterItem
          value={12}
          suffix="+"
          label={t("trust.doctorsLabel")}
          desc={t("trust.doctorsDesc")}
          icon={Users}
          accentColor="teal"
        />
      </div>
    </section>
  );
}
