import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { BranchesSection } from "@/components/sections/BranchesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="flex-1 w-full flex flex-col relative overflow-hidden">
      {/* Sticky Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Stats Bar */}
      <TrustBar />

      {/* About Amritha Clinic */}
      <AboutSection />

      {/* Our 4 Branches Grid (Primary Focal Point) */}
      <BranchesSection />

      {/* Comprehensive Medical Services */}
      <ServicesSection />

      {/* Dedicated Doctors & Specialists */}
      <DoctorsSection />

      {/* Why Choose Us 4-Pillar Grid */}
      <WhyChooseUs />

      {/* Patient Testimonials (Google Review Snippets) */}
      <TestimonialsSection />

      {/* Appointment Booking Form */}
      <AppointmentSection />

      {/* Comprehensive 4-Branch Footer */}
      <Footer />
    </main>
  );
}
