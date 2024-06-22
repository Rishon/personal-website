// Components
import TechStackSection from "@/components/sections/TechStackSection";
import SocialsSection from "@/components/sections/SocialsSection";
import WorkspaceSection from "@/components/sections/WorkspaceSection";

/// React
import React from "react";

export default function Home() {
  function calculateAge() {
    let date = new Date(Date.UTC(2004, 0, 20)).getTime();
    let now = Date.now();
    let age = Math.floor((now - date) / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  }

  return (
    <main className="flex flex-col items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-4xl space-y-4 px-4 sm:px-0">
        {/* Introduction */}
        <h1 className="text-2xl sm:text-4xl font-bold">
          Hi! I{"'"}m Rishon 👋
        </h1>
        <p className="text-lg sm:text-2xl mt-5 text-gray-300">
          I{"'"}m a {calculateAge()}-year-old self-taught software engineer from
          Israel, passionate about technology and always seeking new challenges
          to grow as a developer.
        </p>

        {/* Social */}
        <SocialsSection />

        {/* Workspace */}
        <WorkspaceSection />

        {/* Technologies */}
        <TechStackSection />
      </div>
    </main>
  );
}
