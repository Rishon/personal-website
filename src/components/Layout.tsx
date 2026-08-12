import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import Dock from "@/components/Dock";
import DeskFooter from "@/components/DeskFooter";
import StatusBar from "@/components/StatusBar";
import CookieBanner, { ANALYTICS_CONSENT_KEY } from "@/components/CookieBanner";
import { applyTheme } from "@/lib/theme";
import { SITE_URL } from "@/lib/site";

const pageMeta: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string;
    type?: "website" | "profile";
  }
> = {
  "/": {
    title: "Rishon Jaffe",
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
    description: "Contact Rishon Jaffe.",
    keywords: "contact Rishon Jaffe, software engineer contact",
    type: "website",
  },
  "/404": {
    title: "Page Not Found | Rishon Jaffe",
    description:
      "The page you are looking for could not be found. Visit the homepage to explore projects and contact options.",
    keywords: "404, page not found, Rishon Jaffe",
    type: "website",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(
    null,
  );
  const routeMeta = pageMeta[router.pathname] ?? pageMeta["/"];
  const canonicalUrl = `${SITE_URL}${router.pathname === "/" ? "" : router.pathname}`;
  const robotsContent =
    "index,follow,noimageindex,max-image-preview:none,max-snippet:-1,max-video-preview:-1";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    const storedConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (storedConsent === "true" || storedConsent === "false") {
      setAnalyticsConsent(storedConsent === "true");
    }
  }, []);

  useEffect(() => {
    applyTheme();
    const id = setInterval(applyTheme, 60000);
    return () => clearInterval(id);
  }, []);

  const handleConsentChange = useCallback((consent: boolean) => {
    setAnalyticsConsent(consent);
  }, []);

  const consented = analyticsConsent === true;

  return (
    <>
      <Head>
        <title>{routeMeta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />

        <meta name="description" content={routeMeta.description} />
        <meta name="keywords" content={routeMeta.keywords} />
        <meta name="author" content="Rishon Jaffe" />
        <meta name="robots" content={robotsContent} />
        <meta name="googlebot" content={robotsContent} />

        <meta property="og:title" content={routeMeta.title} />
        <meta property="og:description" content={routeMeta.description} />
        <meta property="og:type" content={routeMeta.type ?? "website"} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Rishon Jaffe" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={routeMeta.title} />
        <meta name="twitter:description" content={routeMeta.description} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#14121a" />
      </Head>

      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rishon Jaffe",
            url: SITE_URL,
            jobTitle: "Software Engineer",
            knowsAbout: [
              "Software Engineering",
              "Full Stack Development",
              "Automation",
              "Backend Systems",
            ],
            sameAs: [
              "https://github.rishon.systems",
              "https://x.rishon.systems",
              "https://linkedin.rishon.systems",
            ],
            description:
              "Software Engineer from Israel building tools, products, and web experiences.",
          }),
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-desk-vignette" />

      <div className="page-panel fixed bottom-dock left-panel right-panel top-panel z-[2] flex flex-col overflow-hidden rounded-2xl max-md:rounded-none">
        <header className="mx-auto w-full max-w-column flex-shrink-0 px-4 pb-v-sm pt-v-md md:px-6">
          <StatusBar />
        </header>

        <main className="mx-auto flex w-full min-h-0 max-w-column flex-1 flex-col overflow-hidden px-4 pb-v-md md:px-6">
          {children}
        </main>
      </div>

      <Dock />
      <DeskFooter />

      {consented && gaId && <GoogleAnalytics gaId={gaId} />}

      {consented && clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
      <CookieBanner onConsentChange={handleConsentChange} />
    </>
  );
};

export default RootLayout;
