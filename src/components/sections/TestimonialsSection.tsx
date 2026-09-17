"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
            <MessageSquareQuote className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
              {t("testimonials.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials Grid (Google review snippet style) */}
        {/* [REPLACE WITH REAL PATIENT TESTIMONIALS] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((item, index) => {
            const reviewerName = locale === "ta" ? item.nameTamil : item.name;
            const reviewerLoc = locale === "ta" ? item.locationTamil : item.location;
            const reviewerComment = locale === "ta" ? item.commentTamil : item.comment;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border border-white/90"
              >
                <div>
                  {/* Star Rating & Review Age */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-600 font-medium">{item.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{reviewerComment}&rdquo;
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-stone-900">{reviewerName}</p>
                      <span title="Verified review">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">{reviewerLoc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full">
                    {item.branchTreated.split("—")[1]?.trim() || item.branchTreated}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
