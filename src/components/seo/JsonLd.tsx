import React from "react";
import { BRANCHES_DATA } from "@/data/branches";

export function MedicalClinicJsonLd() {
  const schemas = BRANCHES_DATA.map((branch) => {
    return {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": `https://amrithaclinic.com/#${branch.id}`,
      name: branch.name,
      alternateName: branch.nameTamil,
      telephone: branch.phone,
      url: "https://amrithaclinic.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.address,
        addressLocality: branch.id.charAt(0).toUpperCase() + branch.id.slice(1),
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: branch.lat,
        longitude: branch.lng,
      },
      ...(branch.mapsUrl ? { hasMap: branch.mapsUrl } : {}),
      openingHoursSpecification: branch.is24Hours
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ]
        : [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: branch.id === "nainarkovil" ? "07:00" : "08:00",
              closes: branch.id === "nainarkovil" ? "10:00" : "21:00",
            },
          ],
      isAcceptingNewPatients: true,
      medicalSpecialty: [
        "PrimaryCare",
        "Emergency",
        "Pediatrics",
        "CommunityHealth",
      ],
      priceRange: "₹",
    };
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
