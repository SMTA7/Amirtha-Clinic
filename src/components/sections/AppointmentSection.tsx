"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BRANCHES_DATA } from "@/data/branches";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Building,
  ChevronDown,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

// Natural time periods without confusing AM/PM
const TIME_SLOTS = [
  {
    groupEn: "Morning Hours",
    groupTa: "காலை நேரம்",
    slots: [
      { en: "Morning (08:00 – 09:00)", ta: "காலை (08:00 – 09:00 மணி)" },
      { en: "Morning (09:00 – 10:00)", ta: "காலை (09:00 – 10:00 மணி)" },
      { en: "Morning (10:00 – 11:00)", ta: "காலை (10:00 – 11:00 மணி)" },
      { en: "Morning (11:00 – 12:00)", ta: "காலை (11:00 – 12:00 மணி)" },
    ],
  },
  {
    groupEn: "Afternoon Hours",
    groupTa: "மதிய நேரம்",
    slots: [
      { en: "Afternoon (12:00 – 01:00)", ta: "மதியம் (12:00 – 01:00 மணி)" },
      { en: "Afternoon (01:00 – 02:00)", ta: "மதியம் (01:00 – 02:00 மணி)" },
      { en: "Afternoon (02:00 – 04:00)", ta: "மதியம் (02:00 – 04:00 மணி)" },
    ],
  },
  {
    groupEn: "Evening Hours",
    groupTa: "மாலை நேரம்",
    slots: [
      { en: "Evening (04:00 – 05:00)", ta: "மாலை (04:00 – 05:00 மணி)" },
      { en: "Evening (05:00 – 06:00)", ta: "மாலை (05:00 – 06:00 மணி)" },
      { en: "Evening (06:00 – 07:00)", ta: "மாலை (06:00 – 07:00 மணி)" },
    ],
  },
  {
    groupEn: "Night & Emergency Hours",
    groupTa: "இரவு & அவசர பிரிவு",
    slots: [
      { en: "Night (07:00 – 08:00)", ta: "இரவு (07:00 – 08:00 மணி)" },
      { en: "Night (08:00 – 09:00)", ta: "இரவு (08:00 – 09:00 மணி)" },
      { en: "Night (09:00 – 10:00)", ta: "இரவு (09:00 – 10:00 மணி)" },
      { en: "Late Night (24x7 Emergency Care)", ta: "இரவு 10:00 மணி மேல் (24x7 அவசர பிரிவு)" },
    ],
  },
];

export function AppointmentSection() {
  const { t, locale } = useLanguage();

  const defaultTime =
    locale === "ta" ? "காலை (09:00 – 10:00 மணி)" : "Morning (09:00 – 10:00)";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    branch: "veeracholan",
    date: "",
    timeSlot: defaultTime,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [bookingId, setBookingId] = useState("");
  const [isBranchHighlighted, setIsBranchHighlighted] = useState(false);

  // Sync branch selection automatically from hash (#appointment?branch=...) or custom event
  useEffect(() => {
    const syncBranchFromTarget = (targetBranchId?: string) => {
      let branchToSelect = targetBranchId;
      if (!branchToSelect && typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash.includes("branch=")) {
          const match = hash.match(/branch=([a-zA-Z0-9_-]+)/);
          if (match && match[1]) {
            branchToSelect = match[1];
          }
        }
      }

      if (branchToSelect) {
        const cleanId = branchToSelect.toLowerCase().trim();
        const exists = BRANCHES_DATA.some((b) => b.id.toLowerCase() === cleanId);
        if (exists) {
          setFormData((prev) => ({ ...prev, branch: cleanId }));
          setIsBranchHighlighted(true);
          const timer = setTimeout(() => setIsBranchHighlighted(false), 2500);
          return () => clearTimeout(timer);
        }
      }
    };

    // Run on initial load
    syncBranchFromTarget();

    // Listen for custom "select-branch" events from Branch Cards
    const handleCustomSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        syncBranchFromTarget(customEvent.detail);
      }
    };

    // Listen for hash change in URL
    const handleHashChange = () => {
      syncBranchFromTarget();
    };

    window.addEventListener("select-branch", handleCustomSelect as EventListener);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("select-branch", handleCustomSelect as EventListener);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const validatePhone = (phone: string) => {
    // Strip spaces and special characters
    const clean = phone.replace(/\D/g, "");
    // Check if 10 digits or 12 digits (with 91 prefix)
    return clean.length === 10 || (clean.length === 12 && clean.startsWith("91"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = locale === "ta" ? "பெயர் தேவை" : "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = locale === "ta" ? "கைபேசி எண் தேவை" : "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        locale === "ta"
          ? "சரியான 10 இலக்க எண்ணை உள்ளிடவும்"
          : "Please enter a valid 10-digit Indian phone number";
    }

    if (!formData.date) {
      newErrors.date = locale === "ta" ? "நாள் தேர்வு செய்யவும்" : "Please select a date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    const payload = {
      fullName: formData.fullName,
      phone: formData.phone.startsWith("+91") ? formData.phone : `+91 ${formData.phone}`,
      branchId: formData.branch,
      branchName: BRANCHES_DATA.find((b) => b.id === formData.branch)?.name || formData.branch,
      preferredDate: formData.date,
      preferredTime: formData.timeSlot,
      message: formData.message || "Routine Consultation",
      locale,
      submittedAt: new Date().toISOString(),
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_BOOKING_WEBHOOK_URL;
      
      // If a webhook is directly provided, POST to it, else POST to our API bridge
      const targetEndpoint = webhookUrl || "/api/book-appointment";

      const res = await fetch(targetEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setBookingId(data.bookingId || `AC-${Math.floor(100000 + Math.random() * 900000)}`);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Booking error:", err);
      // Even if network fails, allow graceful fallback
      setStatus("error");
    }
  };

  const handleWhatsAppDirect = () => {
    const selectedBranch = BRANCHES_DATA.find((b) => b.id === formData.branch);
    const branchName = selectedBranch ? selectedBranch.name : "Amritha Clinic";
    const text = encodeURIComponent(
      `Hello Amritha Clinic!\n\nI would like to book an appointment:\n- Name: ${formData.fullName || "Patient"}\n- Phone: ${formData.phone || "Not specified"}\n- Branch: ${branchName}\n- Date: ${formData.date || "Earliest available"}\n- Time Slot: ${formData.timeSlot}\n- Reason: ${formData.message || "Consultation"}`
    );

    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
      (selectedBranch ? selectedBranch.whatsappNumber : "919443210982");

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  // Get tomorrow date formatted as YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="appointment" className="py-24 relative overflow-hidden bg-[#f4fbf7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/5 border border-teal-800/15 mb-4">
            <CalendarIcon className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950 uppercase tracking-wider">
              {t("appointment.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t("appointment.title")}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t("appointment.subtitle")}
          </p>
        </div>

        {/* Form Container Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl border border-white relative">
          
          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full mb-3">
                  Reference: {bookingId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  {t("appointment.successTitle")}
                </h3>
                <p className="text-stone-600 max-w-md mx-auto mb-8 leading-relaxed text-sm sm:text-base">
                  {t("appointment.successDesc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        fullName: "",
                        phone: "",
                        branch: "veeracholan",
                        date: "",
                        timeSlot: defaultTime,
                        message: "",
                      });
                    }}
                    className="px-6 py-3 rounded-full text-stone-800 bg-stone-100 hover:bg-stone-200 font-semibold text-sm transition-all"
                  >
                    {t("appointment.successNew")}
                  </button>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white bg-[#25D366] hover:bg-[#20ba5a] font-semibold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            ) : status === "error" ? (
              /* Error State */
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  {t("appointment.errorTitle")}
                </h3>
                <p className="text-stone-600 max-w-md mx-auto mb-8 text-sm">
                  {t("appointment.errorDesc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-stone-900 bg-stone-200 hover:bg-stone-300 font-semibold text-sm transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t("appointment.retry")}</span>
                  </button>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-[#25D366] hover:bg-[#20ba5a] font-semibold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Book via WhatsApp Instead</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-2">
                      {t("appointment.fullName")} *
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t("appointment.fullNamePlaceholder")}
                        className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ${
                          errors.fullName ? "border-rose-500 bg-rose-50/20" : "border-stone-300"
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-2">
                      {t("appointment.phone")} *
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t("appointment.phonePlaceholder")}
                        className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ${
                          errors.phone ? "border-rose-500 bg-rose-50/20" : "border-stone-300"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Preferred Branch with Auto-Selection Highlighting */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs sm:text-sm font-bold text-stone-800">
                        {t("appointment.branch")} *
                      </label>
                      {isBranchHighlighted && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs animate-pulse"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-700" />
                          <span>{t("branches.branchAutoSelected")}</span>
                        </motion.span>
                      )}
                    </div>
                    <div
                      className={`relative transition-all duration-300 rounded-2xl ${
                        isBranchHighlighted
                          ? "ring-4 ring-emerald-500/50 shadow-lg shadow-emerald-600/20 scale-[1.01]"
                          : ""
                      }`}
                    >
                      <Building
                        className={`w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none ${
                          isBranchHighlighted ? "text-emerald-700" : "text-stone-400"
                        }`}
                      />
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className={`w-full pl-11 pr-10 py-3 rounded-2xl bg-white/95 border text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all appearance-none cursor-pointer ${
                          isBranchHighlighted
                            ? "border-emerald-500 bg-emerald-50/40"
                            : "border-stone-300"
                        }`}
                      >
                        {BRANCHES_DATA.map((b) => (
                          <option key={b.id} value={b.id}>
                            {locale === "ta" ? b.nameTamil : b.name} {b.is24Hours ? "(24×7)" : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Preferred Date (Column 1) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-2">
                      {locale === "ta" ? "பரிசோதனை நாள் (Date)" : t("appointment.date")} *
                    </label>
                    <div className="relative">
                      <CalendarIcon className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        min={todayStr}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all cursor-pointer ${
                          errors.date ? "border-rose-500 bg-rose-50/20" : "border-stone-300"
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.date}</p>
                    )}
                  </div>

                  {/* Preferred Time (Column 2 - Natural time periods without AM/PM) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-2">
                      {locale === "ta" ? "வருகை நேரம் (Time)" : t("appointment.time")} *
                    </label>
                    <div className="relative">
                      <Clock className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/95 border border-stone-300 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all appearance-none cursor-pointer"
                      >
                        {TIME_SLOTS.map((group, gIdx) => (
                          <optgroup key={gIdx} label={locale === "ta" ? group.groupTa : group.groupEn}>
                            {group.slots.map((s, sIdx) => {
                              const slotLabel = locale === "ta" ? s.ta : s.en;
                              return (
                                <option key={sIdx} value={slotLabel}>
                                  {slotLabel}
                                </option>
                              );
                            })}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Reason / Symptoms */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-2">
                      {t("appointment.message")}
                    </label>
                    <div className="relative">
                      <FileText className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t("appointment.messagePlaceholder")}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all resize-none"
                      />
                    </div>
                  </div>

                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-full text-stone-950 font-extrabold text-base shadow-lg shadow-amber-500/25 gold-gradient hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {status === "submitting" ? t("appointment.submitting") : t("appointment.submit")}
                  </button>
                </div>

                {/* Direct WhatsApp Alternative Button */}
                <div className="pt-4 border-t border-stone-200/80 flex flex-col items-center gap-3">
                  <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">
                    — {locale === "ta" ? "அல்லது" : "OR"} —
                  </span>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-white bg-[#25D366] hover:bg-[#20ba5a] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>{t("appointment.orWhatsApp")}</span>
                  </button>

                  <p className="text-xs text-stone-600 text-center flex items-center gap-1.5 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t("appointment.privacy")}</span>
                  </p>
                </div>
              </form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
