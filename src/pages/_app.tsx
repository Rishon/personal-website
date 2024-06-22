// Next.js
import { AppProps } from "next/app";

// React
import { ReactElement } from "react";

// Components
import Layout from "@/components/Layout";

// Styles
import "@/assets/style/globals.css";

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </div>
  );
}
