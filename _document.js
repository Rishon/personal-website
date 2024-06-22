import Document, { Html, Main, NextScript } from "next/document";
import Script from "next/script";

class _document extends Document {
  render() {
    return (
      <Html lang="en">
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default _document;
