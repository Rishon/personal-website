import React from "react";

export default function TechLabel({
  label,
  children,
}: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div className="flex items-center space-x-2 mt-4 w-auto">
      <div className="flex-shrink-0 text-2xl">{children}</div>
      <span className="text-sm sm:text-base">{label}</span>
    </div>
  );
}
