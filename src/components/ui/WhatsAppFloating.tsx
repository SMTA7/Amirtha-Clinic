"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BRANCHES_DATA } from "@/data/branches";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { X, Send, Building } from "lucide-react";

export function WhatsAppFloating() {
  const { t, locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState("all");
  const [customMessage, setCustomMessage] = useState("");
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleStartChat = () => {
    let targetNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919443210982";
    let branchLabel = "Amritha Clinic (Main Helpline)";

    if (selectedBranchId !== "all") {
      const branch = BRANCHES_DATA.find((b) => b.id === selectedBranchId);
      if (branch) {
        targetNumber = branch.whatsappNumber;
        branchLabel = branch.name;
      }
    }

    const defaultMsg =
      locale === "ta"
        ? `வணக்கம்! ${branchLabel} கிளைக்கான மருத்துவ ஆலோசனை மற்றும் முன்பதிவு பற்றி அறிய விரும்புகிறேன்.`
        : `Hi! I would like to inquire about appointments and consultation timings at ${branchLabel}.`;

    const finalMsg = customMessage.trim() || defaultMsg;
    const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div
      ref={popupRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* Expanded Glass Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="mb-4 w-85 sm:w-95 max-w-[calc(100vw-32px)] glass-popup rounded-3xl p-5 shadow-2xl border border-teal-800/20 text-stone-900"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-stone-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <WhatsAppIcon className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {t("whatsapp.popupTitle")}
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    {t("whatsapp.onlineNow")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close WhatsApp popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="py-4 space-y-3.5">
              <p className="text-xs text-stone-600 leading-relaxed">
                {t("whatsapp.popupSubtitle")}
              </p>

              {/* Branch Selector Dropdown */}
              <div>
                <label className="flex items-center gap-1 text-xs font-bold text-stone-800 mb-1.5">
                  <Building className="w-3.5 h-3.5 text-teal-700" />
                  <span>{t("whatsapp.chooseBranch")}</span>
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all cursor-pointer"
                >
                  <option value="all">{t("whatsapp.allBranches")}</option>
                  {BRANCHES_DATA.map((b) => (
                    <option key={b.id} value={b.id}>
                      {locale === "ta" ? b.nameTamil : b.name} {b.is24Hours ? "(24×7)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional custom message */}
              <div>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={
                    locale === "ta"
                      ? "உங்கள் கேள்வியை உள்ளிடவும்..."
                      : "Type your query here (optional)..."
                  }
                  className="w-full text-xs py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleStartChat();
                  }}
                />
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleStartChat}
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t("whatsapp.startChat")}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular Button with Official WhatsApp Icon & Soft Pulsing Glow */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-emerald-900/25 pulse-whatsapp focus:outline-none cursor-pointer"
        aria-label="Open WhatsApp Chat with Amritha Clinic"
      >
        <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-white" />

        {/* Notification badge dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
      </motion.button>
    </div>
  );
}
