import React from "react";
import Image from "next/image";

export function Logo({
  variant = "dark",
  className = "w-48 h-12",
}: {
  variant?: "dark" | "white";
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={variant === "white" ? "/logo-white.svg" : "/logo.svg"}
        alt="Amritha Clinic"
        fill
        className="object-contain object-left"
      />
    </div>
  );
}
