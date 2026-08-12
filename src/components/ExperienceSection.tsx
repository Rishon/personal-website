interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string;
}

const experiences: ExperienceItem[] = [
    {
        title: "Software Engineer",
        company: "Verart",
        period: "Oct 2022 - Present",
        description:
            "Marketplace platform, content systems, and networking infrastructure.",
    },
    {
        title: "Maintenance Developer",
        company: "LoverCraft",
        period: "Jul 2024 - Jul 2026",
        description:
            "Reliability and long-term stability for a large Minecraft server network.",
    },
    {
        title: "Game Developer",
        company: "Twigo",
        period: "Jun 2023 - Jun 2024",
        description:
            "Viewer-driven gameplay and monetization features for creators.",
    },
    {
        title: "Discord Bot Developer",
        company: "RapTV",
        period: "Mar 2022 - Aug 2023",
        description: "Automation, integrations, and moderation tooling.",
    },
    {
        title: "Java Developer",
        company: "TopStrix",
        period: "Jan 2017 - Dec 2022",
        description:
            "Custom systems for one of Israel's largest Minecraft networks.",
    },
];

export default function ExperienceSection() {
    return (
        <div className="flex min-h-0 flex-col">
            {experiences.map((exp, index) => (
                <div
                    key={`${exp.company}-${exp.title}`}
                    className={`py-row-y ${index !== 0 ? "border-t border-rule-subtle" : ""}`}
                >
                    <div className="flex items-baseline justify-between gap-3">
                        <h3 className="truncate text-body font-medium tracking-tight text-ink">
                            {exp.title} <span className="text-accent">| {exp.company}</span>
                        </h3>
                        <span className="flex-shrink-0 font-mono text-[11px] tabular-nums text-ink-faint">
              {exp.period}
            </span>
                    </div>
                    <p className="truncate text-xs text-ink-muted">{exp.description}</p>
                </div>
            ))}
        </div>
    );
}
