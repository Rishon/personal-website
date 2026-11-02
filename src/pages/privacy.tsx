import { ReactNode } from "react";
import Link from "next/link";
import WordSettle from "@/components/WordSettle";
import { useConsent } from "@/lib/analytics";

const UPDATED = "2 November 2026";

const linkClasses =
  "text-ink underline decoration-accent-40 underline-offset-2 transition-colors hover:text-accent";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-v-xs text-label font-medium uppercase text-ink-faint">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-ink-muted">{children}</p>
    </section>
  );
}

export default function Privacy() {
  const { consent, ready, setConsent } = useConsent();
  const on = consent === true;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-v-md">
      <div className="flex-shrink-0">
        <h1 className="mb-1 text-title">
          <WordSettle delay={0.05}>Privacy</WordSettle>
        </h1>
        <p className="max-w-prose text-lede">
          <WordSettle delay={0.14}>
            What this site collects, and how to change your choice.
          </WordSettle>
        </p>
      </div>

      <div
        className="flex max-w-prose flex-shrink-0 items-center gap-4 rounded-xl px-4 py-3 shadow-hairline animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "0.24s" }}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium tracking-tight text-ink">
            Analytics is {ready ? (on ? "on" : "off") : "..."}
          </p>
          <p className="text-xs leading-relaxed text-ink-muted">
            {on
              ? "Google Analytics and Microsoft Clarity run for you. Turning them off deletes their cookies."
              : "Nothing tracks you. Turning analytics on loads Google Analytics and Microsoft Clarity."}
          </p>
        </div>
        <button
          type="button"
          disabled={!ready}
          onClick={() => setConsent(!on)}
          className={`flex-shrink-0 rounded-[10px] px-3.5 py-2 text-xs font-medium transition-colors duration-200 disabled:opacity-50 ${
            on
              ? "text-ink-muted shadow-hairline hover:bg-ink-hover hover:text-ink"
              : "bg-accent text-white hover:bg-accent-hover"
          }`}
        >
          {on ? "Turn off" : "Turn on"}
        </button>
      </div>

      <div
        className="flex min-h-0 max-w-prose flex-1 flex-col gap-v-md animate-rise opacity-0 [scrollbar-color:var(--rule)_transparent] [scrollbar-width:thin] motion-reduce:animate-none motion-reduce:opacity-100 md:overflow-y-auto md:pr-3"
        style={{ animationDelay: "0.32s" }}
      >
        <Section title="Analytics, only if you accept">
          Nothing loads until you click Accept. If you do,{" "}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            Google Analytics
          </Link>{" "}
          records the pages you view, the site you came from, your approximate
          location and your device, and{" "}
          <Link
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            Microsoft Clarity
          </Link>{" "}
          records clicks, scrolling and session recordings so I can see how
          pages are used. The contact form is always masked in those recordings.
        </Section>

        <Section title="The contact form">
          Your message goes straight to my inbox and isn&apos;t stored on the
          site. A quick check makes sure it was sent by a person, not a bot.
        </Section>

        <Section title="Everything else">
          Like any website, the services that deliver this site see basic
          connection details such as your IP address. Your analytics choice and
          click-sound setting are saved in your browser and never sent anywhere.
        </Section>

        <Section title="Questions">
          To ask what is held about you, or to have it deleted, email{" "}
          <Link href="mailto:mail@rishon.systems" className={linkClasses}>
            mail@rishon.systems
          </Link>
          .
        </Section>

        <p className="text-xs text-ink-faint">Last updated {UPDATED}.</p>
      </div>
    </div>
  );
}
