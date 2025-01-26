// Components
import TechStackSection from "@/components/sections/TechStackSection";
import SocialsSection from "@/components/sections/SocialsSection";
import WorkspaceSection from "@/components/sections/WorkspaceSection";

/// React
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [age, setAge] = useState(0);

  let birthDateDay = 20;
  let birthDateMonth = 1;

  useEffect(() => {
    const checkBirthday = () => {
      const today = new Date();
      return (
        today.getUTCMonth() === birthDateMonth - 1 &&
        today.getUTCDate() === birthDateDay
      );
    };

    const calculateAge = () => {
      let birthDate = new Date(
        Date.UTC(2004, birthDateMonth - 1, birthDateDay)
      ).getTime();
      let now = Date.now();
      return Math.floor((now - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
    };

    if (checkBirthday()) setIsBirthday(true);
    setAge(calculateAge());
  }, [birthDateDay, birthDateMonth]);

  return (
    <main className="w-full max-w-4xl space-y-4 px-4 sm:px-0">
      {isBirthday && <Confetti />}

      {/* Introduction */}
      <h1 className="text-2xl sm:text-4xl font-bold">
        <span className="animated-gradient-text">Hi!</span> I{"'"}m Rishon 👋
      </h1>
      <p className="text-lg sm:text-2xl mt-5 text-[var(--paragraph-color)]">
        I{"'"}m a {age}-year-old self-taught software engineer from Israel who
        is passionate about technology and always seeking new challenges to grow
        as a developer.
      </p>

      {/* Social */}
      <SocialsSection />

      {/* Workspace */}
      <WorkspaceSection />

      {/* Technologies */}
      <TechStackSection />
    </main>
  );
}
