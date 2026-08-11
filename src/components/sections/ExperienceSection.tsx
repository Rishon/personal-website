interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer",
    company: "Verart",
    period: "Oct 2022 - Present",
    type: "Full-time · On-site",
    description:
      "Developing and maintaining a Minecraft marketplace platform, including content systems, backend solutions, and networking infrastructure. Building scalable tools and services.",
  },
  {
    title: "Maintenance Developer",
    company: "LoverCraft LLC",
    period: "Jul 2024 - Jul 2026",
    type: "Contract · Remote",
    description:
      "Maintained and improved infrastructure for LoverCraft, a Minecraft server network operated by YouTuber LoverFella, focusing on reliability, bug fixes, feature updates, and long-term server stability.",
  },
  {
    title: "Game Developer",
    company: "Twigo",
    period: "Jun 2023 - Jun 2024",
    type: "Full-time · Hybrid",
    description:
      "Developed interactive gaming experiences that allowed creators to engage their audiences through viewer-driven challenges, entertainment features, and monetization-focused gameplay mechanics.",
  },
  {
    title: "Discord Bot Developer",
    company: "RapTV",
    period: "Mar 2022 - Aug 2023",
    type: "Contract · Remote",
    description:
      "Developed and maintained Discord automation systems for RapTV, a leading rap media platform, improving community engagement through custom bots, integrations, and moderation tools.",
  },
  {
    title: "Security Control Room Operator",
    company: "Discount Bank",
    period: "Aug 2022 - Jan 2023",
    type: "Part-time · On-site",
    description:
      "Monitored security operations for a major financial institution, handling incident response, surveillance systems, and coordination with security teams to maintain a safe environment.",
  },
  {
    title: "Java Developer",
    company: "TopStrix",
    period: "Jan 2017 - Dec 2022",
    type: "Self-employed · Remote",
    description:
      "Developed software solutions for TopStrix, one of Israel's largest Minecraft networks, supporting over 100,000 unique players and thousands of daily sessions through custom Java-based systems and server infrastructure.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="animate-section animation-delay-100">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {exp.title}
              </h3>
              <span className="text-sm text-[var(--text-secondary)]">
                {exp.period}
              </span>
            </div>
            <p className="text-sm text-[var(--accent)] font-medium">
              {exp.company}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mb-2">
              {exp.type}
            </p>
            <p className="text-sm text-[var(--paragraph-color)] leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
