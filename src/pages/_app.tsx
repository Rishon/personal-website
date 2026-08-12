import {AppProps} from "next/app";
import {Newsreader, Plus_Jakarta_Sans} from "next/font/google";
import {ReactElement} from "react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
    display: "swap",
});

const editorial = Newsreader({
    subsets: ["latin"],
    weight: ["200", "300", "400"],
    style: ["normal", "italic"],
    variable: "--font-editorial",
    display: "swap",
});

export default function MyApp({
                                  Component,
                                  pageProps,
                                  router,
                              }: AppProps): ReactElement {
    return (
        <div className={`${sans.variable} ${editorial.variable} font-sans`}>
            <Layout>
                <Component {...pageProps} key={router.route}/>
            </Layout>
        </div>
    );
}
