interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Maintenance Developer",
    company: "LoverCraft LLC",
    period: "Jul 2024 - Present",
    type: "Contract · Remote",
    description:
      "LoverCraft is a Minecraft server network ran by the YouTuber LoverFella.",
  },
  {
    title: "Game Developer",
    company: "Twigo",
    period: "Jun 2023 - Jun 2024",
    type: "Full-time · Hybrid",
    description:
      "Play and get trolled by your viewers in the most awesome ways while generating more revenue.",
  },
  {
    title: "Discord Bot Developer",
    company: "RapTV",
    period: "Mar 2022 - Aug 2023",
    type: "Freelance · Remote",
    description: "Hottest Rap News, Videos and Music.",
  },
  {
    title: "Security Control Room Operator",
    company: "Discount Bank",
    period: "Aug 2022 - Jan 2023",
    type: "Part-time · On-site",
    description: "Financial services company.",
  },
  {
    title: "Java Developer",
    company: "TopStrix",
    period: "Jan 2017 - Dec 2022",
    type: "Self-employed · Remote",
    description:
      "TopStrix is the largest Minecraft network in Israel with over 100,000 unique players and over 3,000 daily login sessions.",
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
