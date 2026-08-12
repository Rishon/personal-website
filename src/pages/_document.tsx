import {Head, Html, Main, NextScript} from "next/document";

const themeScript = `
(function () {
  try {
    var h = parseInt(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jerusalem", hour: "numeric", hourCycle: "h23"
    }).format(new Date()), 10);
    if (h >= 19 || h < 7) document.documentElement.classList.add("night");
  } catch (e) {}
})();
`;

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script dangerouslySetInnerHTML={{__html: themeScript}}/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
