import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { highlightedProjects } from "../config/ProjectsConfig";

export default function ProjectsSection() {
  return (
    <section className="animate-section animation-delay-300">
      <h2 className="section-title">Highlighted Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlightedProjects.map((project) => (
          <Link
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group"
          >
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--bg-tertiary)]">
                {project.emoji ? (
                  <span className="text-3xl flex items-center justify-center h-full">
                    {project.emoji}
                  </span>
                ) : (
                  <Image
                    src={project.image || ""}
                    alt={project.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  {project.isGithub ? (
                    <FaGithub className="text-xs text-[var(--text-secondary)]" />
                  ) : (
                    <FaExternalLinkAlt className="text-xs text-[var(--text-secondary)]" />
                  )}
                </div>
                <p className="text-sm text-[var(--paragraph-color)] line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/projects"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          View all projects →
        </Link>
      </div>
    </section>
  );
}
