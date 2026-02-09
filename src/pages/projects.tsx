import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  isGithub?: boolean;
}

const allProjects: Project[] = [
  {
    title: "Zeraph",
    description: "Real-time DDoS protection for game servers.",
    image: "/assets/projects/zeraph_logo.webp",
    link: "https://zeraph.app",
  },
  {
    title: "Server Tracker",
    description:
      "Track Minecraft server players with real-time graphs. Monitor player counts and server status.",
    image: "/assets/projects/server_tracker_logo.webp",
    link: "https://track.rishon.systems",
  },
  {
    title: "NovaFrame",
    description:
      "AI-powered creative platform for generating, enhancing, and transforming visuals with speed and precision.",
    image: "/assets/projects/novaframe_logo.webp",
    link: "https://novaframe.io",
  },
  {
    title: "Verart",
    description: "A Minecraft marketplace team.",
    image: "/assets/volunteering/verart_logo.webp",
    link: "https://verart.org",
  },
  {
    title: "PokeSMP",
    description:
      "An immersive Cobblemon Minecraft server experience for Pokémon fans.",
    image: "/assets/volunteering/pokesmp_logo.webp",
    link: "https://pokesmp.net",
  },
  {
    title: "Sync",
    description:
      "Minecraft Paper plugin that syncs player activity and data between instances seamlessly.",
    image: "/assets/projects/sync_logo.webp",
    link: "https://github.com/Rishon/sync",
    isGithub: true,
  },
];

export default function Projects() {
  return (
    <div className="space-y-12 py-8">
      <section className="animate-section">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h1>
        <p className="text-[var(--paragraph-color)] max-w-2xl">
          A collection of projects I've built over the years.
        </p>
      </section>

      {/* Projects */}
      <section className="animate-section animation-delay-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allProjects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--bg-tertiary)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    {project.isGithub ? (
                      <FaGithub className="text-sm text-[var(--text-secondary)]" />
                    ) : (
                      <FaExternalLinkAlt className="text-xs text-[var(--text-secondary)]" />
                    )}
                  </div>
                  <p className="text-sm text-[var(--paragraph-color)] leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-section animation-delay-200">
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">More on GitHub</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Check out my other projects and contributions
            </p>
          </div>
          <Link
            href="https://github.rishon.systems"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--accent-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent)] rounded-lg text-sm font-medium transition-all duration-200"
          >
            <FaGithub />
            View GitHub
          </Link>
        </div>
      </section>
    </div>
  );
}
