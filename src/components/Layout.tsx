// Next.js
import Head from "next/head";
import Script from "next/script";

// Analytics
import { GoogleAnalytics } from "@next/third-parties/google";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeMode from "@/components/ThemeMode";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Head>
        <title>Rishon Jaffe</title>
        <link rel="icon" href="/assets/favicon.ico" />

        {/* Meta Tags */}
        <meta
          name="description"
          content="Software Engineer from Israel. Building tools, crafting experiences, and exploring new technologies."
        />
        <meta
          name="keywords"
          content="Rishon Jaffe, Software Engineer, Developer, Portfolio"
        />
        <meta name="author" content="Rishon Jaffe" />

        <meta property="og:title" content="Rishon Jaffe" />
        <meta
          property="og:description"
          content="Software Engineer from Israel. Building tools, crafting experiences, and exploring new technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rishon.systems" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>

      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://rishon.systems",
            name: "Rishon Jaffe",
            author: {
              "@type": "Person",
              name: "Rishon Jaffe",
            },
            description: "Software Engineer from Israel",
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
