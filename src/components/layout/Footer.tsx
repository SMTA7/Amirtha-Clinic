"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BRANCHES_DATA } from "@/data/branches";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Logo } from "@/components/ui/Logo";
import {
  MapPin,
  Clock,
  Heart,
  ExternalLink,
  ArrowUp,
} from "lucide-react";

export function Footer() {
  const { t, locale, setLocale } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-20 pb-12 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-1 gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Emergency Highlight Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-stone-800">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Logo variant="white" className="w-52 h-12 mb-4" />

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-md mb-6">
              {t("footer.tagline")}
            </p>

            {/* Language Switcher in Footer */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-stone-500 font-medium">Language / மொழி:</span>
              <div className="inline-flex rounded-full bg-stone-800 p-1 border border-stone-700">
                <button
                  onClick={() => setLocale("en")}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    locale === "en" ? "bg-teal-700 text-white" : "text-stone-400 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLocale("ta")}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    locale === "ta" ? "bg-teal-700 text-white" : "text-stone-400 hover:text-white"
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links & Emergency Hotlines */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase">
                {t("footer.quickLinksHeading")}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#home" className="hover:text-teal-400 transition-colors">
                    {t("nav.home")}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-teal-400 transition-colors">
                    {t("nav.about")}
                  </a>
                </li>
                <li>
                  <a href="#branches" className="hover:text-teal-400 transition-colors">
                    {t("nav.branches")}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-400 transition-colors">
                    {t("nav.services")}
                  </a>
                </li>
                <li>
                  <a href="#doctors" className="hover:text-teal-400 transition-colors">
                    {t("nav.doctors")}
                  </a>
                </li>
                <li>
                  <a href="#appointment" className="text-amber-400 hover:text-amber-300 font-semibold">
                    {t("nav.bookAppointment")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Emergency Hotline Box */}
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide text-stone-950 gold-gradient mb-3">
                  <Clock className="w-3.5 h-3.5 text-stone-950" />
                  24×7 EMERGENCY
                </span>
                <h4 className="text-white font-bold text-lg mb-2">
                  {t("footer.emergencyHeading")}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed mb-4">
                  {t("footer.emergencyNote")}
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href="tel:+919443210985"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-900 text-teal-300 text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <span>Veeracholan Hospital:</span>
                  <span className="font-mono text-white">+91 94432 10985</span>
                </a>
                <a
                  href="tel:+919443210982"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-900 text-teal-300 text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <span>Perunali Hospital:</span>
                  <span className="font-mono text-white">+91 94432 10982</span>
                </a>
                <a
                  href="tel:+919443210983"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-900 text-teal-300 text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <span>Vembar Hospital:</span>
                  <span className="font-mono text-white">+91 94432 10983</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Branch Locations Clean Details Grid */}
        <div className="py-14 border-b border-stone-800">
          <h3 className="text-white font-bold text-lg mb-8 tracking-wide">
            {t("footer.branchesHeading")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs">
            {BRANCHES_DATA.map((branch) => {
              const branchName = locale === "ta" ? branch.nameTamil : branch.name;
              const branchAddress = locale === "ta" ? branch.addressTamil : branch.address;
              const branchHours = locale === "ta" ? branch.hoursTamil : branch.hours;
              const hasMap = branch.hasMap !== false && !!branch.mapsUrl;

              return (
                <div key={branch.id} className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{branchName.split("—")[1]?.trim() || branchName}</span>
                    </h4>
                    <p className="text-stone-400 leading-relaxed mb-3">{branchAddress}</p>
                    <div className="text-stone-300 flex items-center gap-1.5 mb-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{branchHours}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center gap-3">
                    {hasMap && (
                      <>
                        <a
                          href={branch.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1"
                        >
                          <span>Google Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-stone-700">•</span>
                      </>
                    )}
                    <a
                      href={`https://wa.me/${branch.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{t("footer.communityNote")}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Amritha Clinic. {t("footer.rights")}</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
