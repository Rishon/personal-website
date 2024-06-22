import Head from "next/head";

// Google
import { GoogleAnalytics } from "@next/third-parties/google";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Head>
        <title>Rishon Jaffe</title>
        <meta name="description" content="👋 hello there" />
        <meta name="keywords" content="Rishon, Website, About Me" />
        <meta name="author" content="Rishon Jaffe" />
        <link rel="icon" href="/assets/favicon.ico" />
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
