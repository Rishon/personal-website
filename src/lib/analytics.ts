import { createContext, useContext } from "react";

export const ANALYTICS_CONSENT_KEY = "analytics-consent";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const TRACKERS_ENABLED = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export type Consent = boolean | null;

export function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {}
  return null;
}

export function storeConsent(consent: boolean): void {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, String(consent));
  } catch {}
}

function expireCookies(pattern: RegExp): void {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => pattern.test(name));

  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++) {
    domains.push(`; domain=.${labels.slice(i).join(".")}`);
  }

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

export function shutdownTrackers(): void {
  if (GA_ID) {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] =
      true;
  }
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "denied",
  });
  expireCookies(/^(_ga|_gid|_gat|_clck|_clsk)/);
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params ?? {});
  window.clarity?.("event", name);
}

interface ConsentState {
  consent: Consent;
  ready: boolean;
  setConsent: (consent: boolean) => void;
}

export const ConsentContext = createContext<ConsentState>({
  consent: null,
  ready: false,
  setConsent: () => {},
});

export const useConsent = () => useContext(ConsentContext);
