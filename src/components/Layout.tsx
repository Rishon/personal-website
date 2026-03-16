// Next.js
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

// Analytics
import { GoogleAnalytics } from "@next/third-parties/google";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeMode from "@/components/ThemeMode";

const SITE_URL = "https://rishon.systems";

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
    title: "Projects | Rishon Jaffe",
    description:
      "Explore projects by Rishon Jaffe, including SaaS tools, developer products, and open-source work across web and game ecosystems.",
    keywords:
      "Rishon projects, developer portfolio projects, SaaS projects, open source, software products",
    type: "website",
  },
  "/contact": {
    title: "Contact | Rishon Jaffe",
    description:
      "Contact Rishon Jaffe for technical consulting or software engineering opportunities.",
    keywords:
      "contact Rishon Jaffe, software engineer contact, technical consulting",
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
  const routeMeta = pageMeta[router.pathname] ?? pageMeta["/"];
  const canonicalUrl = `${SITE_URL}${router.pathname === "/" ? "" : router.pathname}`;
  const robotsContent =
    "index,follow,noimageindex,max-image-preview:none,max-snippet:-1,max-video-preview:-1";

  return (
    <>
      <Head>
        <title>{routeMeta.title}</title>
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Meta Tags */}
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
        <meta name="theme-color" content="#0a0a0f" />
      </Head>

      {/* JSON Structured Data */}
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

      <div className="min-h-screen flex flex-col">
        {/* Subtle background gradient */}
        <div className="fixed inset-0 bg-gradient-subtle pointer-events-none" />

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-grow flex flex-col items-center px-6 py-12 sm:px-8 lg:px-12 relative z-10">
          <div className="w-full max-w-3xl">{children}</div>
        </main>

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/* Theme Mode */}
        <ThemeMode />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
