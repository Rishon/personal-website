import Link from "next/link";
import WordSettle from "@/components/WordSettle";
import ProjectGrid from "@/components/ProjectGrid";
import {LuGithub} from "react-icons/lu";
import {allProjects} from "@/config/projects";

export default function Projects() {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-v-md">
            <div className="flex-shrink-0">
                <h1 className="mb-1 text-title">
                    <WordSettle delay={0.05}>Work</WordSettle>
                </h1>
                <p className="max-w-prose text-lede">
                    <WordSettle delay={0.14}>
                        Things I&apos;ve built - some shipped to real users, some still
                        running quietly in the background.
                    </WordSettle>
                </p>
            </div>

            <div
                className="min-h-0 flex-1 animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
                style={{animationDelay: "0.3s"}}
            >
                <ProjectGrid projects={allProjects}/>
            </div>

            <div
                className="flex flex-shrink-0 items-center justify-between gap-4 border-t border-rule-subtle pt-v-sm animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
                style={{animationDelay: "0.4s"}}
            >
                <p className="text-xs text-ink-muted">
                    Other experiments and contributions live on GitHub.
                </p>
                <Link
                    href="https://github.rishon.systems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-shrink-0 items-center gap-2 rounded-[10px] px-3 py-2 text-xs font-medium text-ink shadow-hairline transition-colors duration-200 hover:bg-ink-hover"
                >
                    <LuGithub className="h-3.5 w-3.5"/>
                    View GitHub
                </Link>
            </div>
        </div>
    );
}
