import {useEffect, useState} from "react";
import Link from "next/link";
import WordSettle from "@/components/WordSettle";
import TechToken from "@/components/TechToken";
import ExperienceSection from "@/components/ExperienceSection";
import {SiDocker, SiKotlin, SiTypescript} from "react-icons/si";
import {TbBrandNextjs} from "react-icons/tb";

const BIRTH_DATE = Date.UTC(2004, 0, 20);

export default function Home() {
    const [age, setAge] = useState<number | null>(null);

    useEffect(() => {
        const years = (Date.now() - BIRTH_DATE) / (1000 * 60 * 60 * 24 * 365.25);
        setAge(Math.floor(years));
    }, []);

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-v-md">
            <div className="flex-shrink-0">
                <h1 className="mb-1 text-title">
                    <WordSettle delay={0.05}>Hey, I&apos;m Rishon.</WordSettle>
                </h1>
                <p className="text-lede">
                    <WordSettle delay={0.16}>
                        {`Software engineer${age ? `, ${age},` : ","} based in Israel.`}
                    </WordSettle>
                </p>
            </div>

            <div className="max-w-prose flex-shrink-0 text-body">
                <WordSettle delay={0.3}>
                    I&apos;m a self-taught software engineer from Israel. I like building
                    tools, and sitting with a problem a little past what I already know.
                </WordSettle>
            </div>

            <div className="max-w-prose flex-shrink-0 text-body">
                <WordSettle delay={0.5}>
                    Most of my work splits two ways: web tools in{" "}
                    <TechToken icon={SiTypescript} label="TypeScript" color="#3178c6"/>{" "}
                    and <TechToken icon={TbBrandNextjs} label="Next.js"/>, and game
                    server infrastructure in{" "}
                    <TechToken icon={SiKotlin} label="Kotlin" color="#7f52ff"/> -
                    proxies, plugin libraries, and{" "}
                    <TechToken icon={SiDocker} label="Docker" color="#2496ed"/> for
                    scaling.
                </WordSettle>
            </div>

            <div className="max-w-prose flex-shrink-0 text-body">
                <WordSettle delay={0.7}>
                    Right now I&apos;m building{" "}
                    <Link href="https://glade.chat" target="_blank"
                          className="font-medium text-ink underline decoration-accent-40 underline-offset-4 transition-colors hover:text-accent">
                        Glade
                    </Link>{" "}
                    and{" "}
                    <Link href="https://zeraph.app" target="_blank"
                          className="font-medium text-ink underline decoration-accent-40 underline-offset-4 transition-colors hover:text-accent">
                        Zeraph
                    </Link>
                    .
                </WordSettle>
            </div>

            <section
                className="flex min-h-0 flex-1 flex-col animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
                style={{animationDelay: "0.88s"}}
            >
                <h2 className="mb-v-xs flex-shrink-0 text-label font-medium uppercase text-ink-faint">
                    Where I&apos;ve worked
                </h2>
                <ExperienceSection/>
            </section>
        </div>
    );
}
