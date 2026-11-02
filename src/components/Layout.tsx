import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import Dock from "@/components/Dock";
import DeskFooter from "@/components/DeskFooter";
import StatusBar from "@/components/StatusBar";
import CookieBanner from "@/components/CookieBanner";
import { applyTheme } from "@/lib/theme";
import { SITE_URL } from "@/lib/site";
import {
  CLARITY_ID,
  Consent,
  ConsentContext,
  GA_ID,
  TRACKERS_ENABLED,
  readConsent,
  shutdownTrackers,
  storeConsent,
} from "@/lib/analytics";

const pageMeta: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string;
    type?: "website" | "profile";
    noindex?: boolean;
  }
> = {
  "/": {
    title: "Rishon Jaffe | Software Engineer",
    description:
      "Software Engineer from Israel focused on web development, backend systems, automation, and building practical tools.",
    keywords:
      "Rishon Jaffe, software engineer, full stack developer, web development, backend, portfolio",
    type: "profile",
  },
  "/projects": {
    title: "Work | Rishon Jaffe",
    description:
      "Explore projects by Rishon Jaffe, including SaaS tools, developer products, and open-source work across web and game ecosystems.",
    keywords:
      "Rishon projects, developer portfolio projects, SaaS projects, open source, software products",
    type: "website",
  },
  "/contact": {
    title: "Contact | Rishon Jaffe",
    description:
      "Get in touch with Rishon Jaffe, a software engineer from Israel - send a message about a project, collaboration, or role, or connect on GitHub, LinkedIn, X, and Discord.",
    keywords: "contact Rishon Jaffe, software engineer contact",
    type: "website",
  },
  "/privacy": {
    title: "Privacy | Rishon Jaffe",
    description:
      "What rishon.systems collects, which analytics run only with your consent, and how to change your choice.",
    keywords: "privacy, cookies, analytics, Rishon Jaffe",
    type: "website",
  },
  "/404": {
    title: "Page Not Found | Rishon Jaffe",
    description:
      "The page you are looking for could not be found. Visit the homepage to explore projects and contact options.",
    keywords: "404, page not found, Rishon Jaffe",
    type: "website",
    noindex: true,
  },
};

const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: "Rishon Jaffe - Software engineer based in Israel",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rishon Jaffe",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Rishon Jaffe",
      url: SITE_URL,
      jobTitle: "Software Engineer",
      worksFor: { "@type": "Organization", name: "Verart" },
      address: { "@type": "PostalAddress", addressCountry: "IL" },
      knowsAbout: [
        "Software Engineering",
        "Full Stack Development",
        "Automation",
        "Backend Systems",
        "TypeScript",
        "Next.js",
        "Kotlin",
        "Docker",
      ],
      sameAs: [
        "https://github.com/Rishon",
        "https://x.com/ItsRishon",
        "https://www.linkedin.com/in/rishonj/",
      ],
      description:
        "Software Engineer from Israel building tools, products, and web experiences.",
    },
  ],
};

const structuredDataHtml = JSON.stringify(structuredData).replace(
  /</g,
  "\\u003c",
);

const claritySnippet = (id: string) =>
  `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");` +
  `window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"granted"});`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [consent, setConsentState] = useState<Consent>(null);
  const [consentReady, setConsentReady] = useState(false);
  const routeMeta = pageMeta[router.pathname] ?? pageMeta["/"];
  const canonicalUrl = `${SITE_URL}${router.pathname === "/" ? "" : router.pathname}`;

  useEffect(() => {
    setConsentState(readConsent());
    setConsentReady(true);
  }, []);

  useEffect(() => {
    applyTheme();
    const id = setInterval(applyTheme, 60000);
    return () => clearInterval(id);
  }, []);

  const setConsent = useCallback(
    (next: boolean) => {
      storeConsent(next);
      if (!next && consent === true && TRACKERS_ENABLED) {
        shutdownTrackers();
        window.location.reload();
        return;
      }
      setConsentState(next);
    },
    [consent],
  );

  const consentValue = useMemo(
    () => ({ consent, ready: consentReady, setConsent }),
    [consent, consentReady, setConsent],
  );

  const trackersOn = TRACKERS_ENABLED && consent === true;

  return (
    <ConsentContext.Provider value={consentValue}>
      <Head>
        <title>{routeMeta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        {!routeMeta.noindex && <link rel="canonical" href={canonicalUrl} />}
        {routeMeta.noindex && <meta name="robots" content="noindex" />}

        <meta name="description" content={routeMeta.description} />
        <meta name="keywords" content={routeMeta.keywords} />
        <meta name="author" content="Rishon Jaffe" />

        <meta property="og:title" content={routeMeta.title} />
        <meta property="og:description" content={routeMeta.description} />
        <meta property="og:type" content={routeMeta.type ?? "website"} />
        {!routeMeta.noindex && (
          <meta property="og:url" content={canonicalUrl} />
        )}
        <meta property="og:site_name" content="Rishon Jaffe" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={OG_IMAGE.url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={String(OG_IMAGE.width)} />
        <meta property="og:image:height" content={String(OG_IMAGE.height)} />
        <meta property="og:image:alt" content={OG_IMAGE.alt} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ItsRishon" />
        <meta name="twitter:title" content={routeMeta.title} />
        <meta name="twitter:description" content={routeMeta.description} />
        <meta name="twitter:image" content={OG_IMAGE.url} />
        <meta name="twitter:image:alt" content={OG_IMAGE.alt} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#14121a" />

        <script
          key="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataHtml }}
        />
      </Head>

      <div className="pointer-events-none fixed inset-0 z-0 bg-desk-vignette" />

      <div className="page-panel fixed bottom-dock left-panel right-panel top-panel z-[2] flex flex-col overflow-hidden rounded-2xl max-md:rounded-none">
        <header className="mx-auto w-full max-w-column flex-shrink-0 px-4 pb-v-sm pt-v-md md:px-6">
          <StatusBar />
        </header>

        <main className="mx-auto w-full min-h-0 max-w-column flex-1 px-4 pb-v-md max-md:block max-md:overflow-y-auto max-md:overscroll-y-contain md:flex md:flex-col md:overflow-hidden md:px-6">
          {children}

          <div className="mt-v-lg flex items-center justify-between border-t border-rule-subtle pt-v-sm text-xs text-ink-faint md:hidden">
            <span>© {new Date().getFullYear()} Rishon Jaffe</span>
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
          </div>
        </main>
      </div>

      <Dock />
      <DeskFooter />

      {trackersOn && GA_ID && <GoogleAnalytics gaId={GA_ID} />}

      {trackersOn && CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {claritySnippet(CLARITY_ID)}
        </Script>
      )}

      <CookieBanner />
    </ConsentContext.Provider>
  );
};

export default RootLayout;
