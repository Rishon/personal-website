import Link from "next/link";
import { LuChartNoAxesColumn } from "react-icons/lu";
import { useConsent } from "@/lib/analytics";

export default function CookieBanner() {
  const { consent, ready, setConsent } = useConsent();

  if (!ready || consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-[calc(var(--dock-height)+16px)] z-[70] px-4 md:px-6">
      <div className="mx-auto flex max-w-column animate-rise flex-col gap-3 rounded-2xl bg-paper-elev p-4 opacity-0 shadow-[0_0_0_1px_var(--rule),var(--shadow-inset),0_18px_40px_-12px_rgba(0,0,0,0.55)] motion-reduce:animate-none motion-reduce:opacity-100 sm:flex-row sm:items-center sm:gap-5 sm:py-3.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent-20 text-accent max-sm:hidden">
          <LuChartNoAxesColumn className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium tracking-tight text-ink">
            Analytics cookies
          </p>
          <p className="text-xs leading-relaxed text-ink-muted">
            Google Analytics records visits and device stats, Microsoft Clarity
            records how pages are used. Decline for no tracking. You can change
            this any time on the{" "}
            <Link
              href="/privacy"
              className="text-ink underline decoration-accent-40 underline-offset-2 transition-colors hover:text-accent"
            >
              privacy page
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setConsent(false)}
            className="flex-1 rounded-[10px] px-3.5 py-2 text-xs font-medium text-ink-muted shadow-hairline transition-colors duration-200 hover:bg-ink-hover hover:text-ink sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent(true)}
            className="flex-1 rounded-[10px] bg-accent px-3.5 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-accent-hover sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
