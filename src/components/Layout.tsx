// Next.js
import Head from "next/head";

// Analytics
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <meta name="description" content="👋 hello there" />
        <meta name="keywords" content="Rishon, Website, About Me" />
        <meta name="author" content="Rishon Jaffe" />

        <meta property="og:title" content="Rishon Jaffe" />
        <meta property="og:description" content="👋 hello there" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rishon.systems" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-grow flex flex-col items-center p-14">
          {children}
        </main>

        {/* Google Analytics */}
        <GoogleAnalytics gaId={`G-G5YRCNRC4H`} />

        {/* Vercel Speed Insights */}
        <SpeedInsights />

        {/* Theme Mode */}
        <ThemeMode />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
