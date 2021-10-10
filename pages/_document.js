import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script src="netlifyAdmin.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
