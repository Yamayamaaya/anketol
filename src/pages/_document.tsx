import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="アンケトル" />
          <meta
            property="og:description"
            content="アンケートを、もっと手軽に"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://anketol.web.app/signin" />
          <meta property="og:image" content="/favicon.png" />
          <meta property="og:site_name" content="アンケトル" />
          <meta property="og:locale" content="ja_JP" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
