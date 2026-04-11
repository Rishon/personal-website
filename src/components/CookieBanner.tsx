import { useEffect, useState } from "react";

export const ANALYTICS_CONSENT_KEY = "analytics-consent";

interface CookieBannerProps {
  onConsentChange: (consent: boolean) => void;
}

export default function CookieBanner({ onConsentChange }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);

    if (storedConsent === "true" || storedConsent === "false") {
      onConsentChange(storedConsent === "true");
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
  }, [onConsentChange]);

  const saveConsent = (consent: boolean) => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, String(consent));
    onConsentChange(consent);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-3xl rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/95 p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          Analytics cookies
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          Google Analytics helps me track visits and device stats. Accept to
          enable cookies, or decline for no tracking.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => saveConsent(false)}
            className="rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveConsent(true)}
            className="rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
