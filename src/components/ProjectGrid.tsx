import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {LuArrowUpRight, LuChevronDown, LuGithub} from "react-icons/lu";
import type {Project} from "@/config/projects";

export default function ProjectGrid({projects}: { projects: Project[] }) {
    const [open, setOpen] = useState<string | null>(null);

    // Opens the given project and closes any other
    const toggle = (title: string) =>
        setOpen((prev) => (prev === title ? null : title));

    return (
        <div className="grid min-h-0 grid-cols-1 gap-v-xs sm:grid-cols-2">
            {projects.map((project) => {
                const isOpen = open === project.title;
                const panelId = `project-${project.title.replace(/\s+/g, "-")}`;

                return (
                    <div
                        key={project.title}
                        className={`rounded-xl transition-colors duration-200 ${
                            isOpen ? "bg-subtle" : ""
                        }`}
                    >
                        <div className="flex items-center gap-2 px-3 py-row-y">
                            <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex min-w-0 flex-1 items-center gap-3"
                            >
                <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-paper-tan">
                  {project.emoji ? (
                      <span className="flex h-full items-center justify-center text-lg">
                      {project.emoji}
                    </span>
                  ) : (
                      <Image
                          src={project.image || ""}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-cover"
                      />
                  )}
                </span>

                                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-body font-medium tracking-tight text-ink">
                      {project.title}
                    </span>
                      {project.isGithub ? (
                          <LuGithub className="h-3 w-3 flex-shrink-0 text-ink-faint"/>
                      ) : (
                          <LuArrowUpRight
                              className="h-3 w-3 flex-shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
                      )}
                  </span>
                                    {!isOpen && (
                                        <span className="block truncate text-xs text-ink-muted">
                      {project.description}
                    </span>
                                    )}
                </span>
                            </Link>

                            <button
                                type="button"
                                onClick={() => toggle(project.title)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                aria-label={`More about ${project.title}`}
                                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-ink-faint transition-colors duration-200 hover:bg-ink-hover hover:text-ink"
                            >
                                <LuChevronDown
                                    className={`h-3.5 w-3.5 transition-transform duration-300 ease-settle ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        </div>

                        {isOpen && (
                            <div id={panelId} className="px-3 pb-2.5 pl-14">
                                <p className="text-xs leading-relaxed text-ink-muted">
                                    {project.details ?? project.description}
                                </p>
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent transition-opacity duration-200 hover:opacity-75"
                                >
                                    {project.isGithub ? "View source" : "Visit"}
                                    <LuArrowUpRight className="h-3 w-3"/>
                                </Link>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
