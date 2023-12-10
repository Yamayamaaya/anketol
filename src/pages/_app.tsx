import type { AppProps } from 'next/app'
import Head from 'next/head'
import { chakra, ChakraProvider } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider'
import { Header } from '@src/component/Header'
import { Footer } from '@src/component/Footer'
import { theme } from '@src/lib/chakra/theme'
import '../styles/globals.css'

initializeFirebaseApp()
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Anketol</title>
        <link rel="icon" href="/favicon.png " />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Header />
          <chakra.main
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            minHeight={0}
          >
            <Component {...pageProps} />
          </chakra.main>
          <Footer />
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
