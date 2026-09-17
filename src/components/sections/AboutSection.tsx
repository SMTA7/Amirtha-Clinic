"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { HeartPulse, CheckCircle2, Users2, Shield, Sparkles } from "lucide-react";

export function AboutSection() {
  const { t, locale } = useLanguage();

  // 3D tilt card effect
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
              <HeartPulse className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
                {t("about.badge")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug mb-6">
              {t("about.title")}
            </h2>

            <p className="text-base sm:text-lg text-stone-600 mb-5 leading-relaxed">
              {t("about.para1")}
            </p>

            <p className="text-base sm:text-lg text-stone-600 mb-8 leading-relaxed">
              {t("about.para2")}
            </p>

            {/* Checklist Highlights */}
            <div className="space-y-3.5 mb-8 w-full">
              {[t("about.highlight1"), t("about.highlight2"), t("about.highlight3")].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-stone-800">{item}</span>
                </div>
              ))}
            </div>

            {/* Community Stat Highlight */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-teal-50/80 border border-teal-200/70 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Our Community Reach</p>
                <p className="text-sm font-bold text-stone-900">{t("about.badgeFloating")}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Column: 3D tilt photo card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-135 aspect-4/3 rounded-3xl p-3 glass-card shadow-2xl transition-shadow duration-300 hover:shadow-teal-900/20"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-900 shadow-inner">
                <Image
                  src="/images/clinic/amritha-reception.jpg"
                  alt="Amritha Clinic Reception & Consultation Lounge"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Card footer overlay inside image (now completely visible with zero obstruction) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      {locale === "ta" ? "முதன்மை மையம்" : "Central Facility"}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight">
                      {locale === "ta" ? "அம்ரிதா கிளினிக் தலைமை மையம்" : "Amritha Clinic Main Wing"}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30">
                    {locale === "ta" ? "தமிழ்நாடு" : "Est. Tamil Nadu"}
                  </span>
                </div>
              </div>

              {/* Floating glass badge repositioned to top-right to avoid blocking any text */}
              <div
                style={{ transform: "translateZ(30px)" }}
                className="absolute -top-5 -right-3 sm:-right-5 glass-card px-4 py-2.5 rounded-2xl shadow-xl border border-white flex items-center gap-3 bg-white/95 backdrop-blur-md"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-snug">
                    {locale === "ta" ? "நம்பகமான மருத்துவம்" : "Trusted Healthcare"}
                  </p>
                  <p className="text-[10px] text-stone-500 font-medium">
                    {locale === "ta" ? "அரசு பதிவு பெற்ற மையம்" : "Government Registered Practice"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
