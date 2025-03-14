import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      throw error;
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="theme-color" content="#4B3872" />
          <meta name="author" content="IROLIM" />
          <meta httpEquiv="Email" content="bkksg.studio@gmail.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="title" content={`비껴서기 | BKKSG`} />
          <meta
            name="description"
            itemProp="description"
            content={`이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 시, 수필, 미술, 시각, 기획`}
          />
          <meta
            name="keywords"
            itemProp="keywords"
            content={`비껴서기, bkksg, ㅂㄲㅅㄱ, IROLIM, 이로, 시, 수필, 글, Art, 시각, 설치, 기획, poetdeveopler, 林이로, 움직이는 화랑`}
          />
          <meta property="og:url" content={`https://bkksg.com/`} />
          <meta property="og:title" content={`비껴서기 | BKKSG`} />
          <meta property="og:site_name" content={`비껴서기 | BKKSG`} />
          <meta
            property="og:description"
            content={`이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 시, 수필, 미술, 시각, 기획`}
          />
          <meta
            property="og:image"
            content={"/thumbnail/bkksg_thumbnail.png"}
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={`비껴서기 | 비껴서기`} />
          <meta
            name="twitter:description"
            content={`이로가 비껴서서 생각하고 설계하고 만드는, 움직이는 화랑 | 시, 수필, 미술, 시각, 기획`}
          />
          <meta
            name="twitter:image"
            content={"/thumbnail/bkksg_thumbnail.png"}
          />
          <meta
            name="naver-site-verification"
            content={process.env.NEXT_PUBLIC_REACT_NAVER_SITE_VERIFICATION}
          />
          <link rel="canonical" href={`https://bkksg.com/`} />
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            src={process.env.GOOGLE_ADSENSE}
            crossorigin="anonymous"
          ></script>
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
