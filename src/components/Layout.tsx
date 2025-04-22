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
          content="👋 Rishon Jaffe, Software Engineer from Israel"
        />
        <meta name="keywords" content="Rishon, Website, About Me" />
        <meta name="author" content="Rishon Jaffe" />

        <meta property="og:title" content="Rishon Jaffe" />
        <meta
          property="og:description"
          content="👋 Rishon Jaffe, Software Engineer from Israel"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rishon.systems" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
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
              "@type": "Organization",
              name: "Sela Development",
            },
            description: "👋 Rishon Jaffe, Software Engineer from Israel",
            potentialAction: {
              "@type": "SearchAction",
              target: `https://rishon.systems/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-grow flex flex-col items-center p-14">
          {children}
        </main>

        {/* Google Analytics */}
        <GoogleAnalytics gaId={`G-G5YRCNRC4H`} />

        {/* Theme Mode */}
        <ThemeMode />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
