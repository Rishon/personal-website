// React
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

// Sections
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  const [age, setAge] = useState(22);

  useEffect(() => {
    const birthDate = new Date(Date.UTC(2004, 0, 20)).getTime();
    const now = Date.now();
    setAge(Math.floor((now - birthDate) / (1000 * 60 * 60 * 24 * 365.25)));
  }, []);

  return (
    <div className="space-y-20">
      <section className="animate-section pt-8">
        <div className="space-y-6">
          <div className="location-badge w-fit">
            <FaMapMarkerAlt className="text-xs" />
            <span>Israel</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="animated-gradient-text">Hey!</span> I'm Rishon
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)]">
              Software Engineer · {age} years old
            </p>
          </div>

          <p className="text-base sm:text-lg text-[var(--paragraph-color)] leading-relaxed max-w-2xl">
            I'm a self-taught software engineer passionate about building tools
            and exploring new technologies. I love crafting solutions that make
            a difference.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact CTA */}
      <section className="animate-section animation-delay-500">
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Let's Connect</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-medium transition-all duration-200 hover:translate-y-[-2px]"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
