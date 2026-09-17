import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { WhatsAppFloating } from "@/components/ui/WhatsAppFloating";
import { MedicalClinicJsonLd } from "@/components/seo/JsonLd";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://amrithaclinic.com"),
  title: "Amritha Clinic | Trusted Multi-Branch Healthcare in Tamil Nadu",
  description:
    "Amritha Clinic provides compassionate 24x7 emergency medical care, general medicine, and dedicated specialists across 5+ locations: Veeracholan, Perunali, Vembar, Narikkudi, Potakavayal, and Nainarkovil.",
  keywords: [
    "Amritha Clinic",
    "Hospital in Veeracholan",
    "Hospital in Perunali",
    "Hospital in Vembar",
    "Clinic in Narikkudi",
    "Clinic in Potakavayal",
    "Clinic in Nainarkovil",
    "24 hours clinic Tamil Nadu",
    "Doctor consultation Ramanathapuram",
    "Emergency hospital Tamil Nadu",
  ],
  authors: [{ name: "Amritha Clinic" }],
  creator: "Amritha Clinic Medical Network",
  publisher: "Amritha Clinic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Amritha Clinic | Trusted Healthcare Across Tamil Nadu",
    description:
      "24x7 Emergency Care and Family Healthcare across 5+ care locations: Veeracholan, Perunali, Vembar, Narikkudi, Potakavayal, and Nainarkovil.",
    url: "https://amrithaclinic.com",
    siteName: "Amritha Clinic",
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
    type: "website",
    images: [
      {
        url: "/images/clinic/reception.jpg",
        width: 1200,
        height: 800,
        alt: "Amritha Clinic Healthcare Facilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amritha Clinic | Multi-Branch Healthcare in Tamil Nadu",
    description: "24x7 Emergency Care and Compassionate Family Medicine.",
    images: ["/images/clinic/reception.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${notoSansTamil.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <MedicalClinicJsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-offwhite text-charcoal-text selection:bg-teal-700 selection:text-white">
        <SmoothScroll>
          <LanguageProvider>
            {children}
            <WhatsAppFloating />
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
