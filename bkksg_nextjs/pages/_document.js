import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import HeadMeta from '../src/Component/lib/SEO';
import React, {useState} from "react"

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } catch (error) {
      throw error;
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='ko'>
        <Head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#4B3872"/>
        <meta name="author" content="IROLIM"/>
        <meta http-equiv="Email" content="bkksg.studio@gmail.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <link rel="icon" href="/favicon.ico"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}

export default CustomDocument;