import type { AppProps } from 'next/app'
import Head from 'next/head'
import { chakra, ChakraProvider } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider'
import { Header } from '@src/components/Header'
import { Footer } from '@src/components/Footer'
import { theme } from '@src/lib/chakra/theme'
import { useRouter } from 'next/router'
import '../styles/globals.css'

initializeFirebaseApp()
function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const isSignInOrUpPage = pathname === '/signin' || pathname === '/signup'

  return (
    <>
      <Head>
        <title>Anketol</title>
        <link rel="icon" href="/favicon.png " />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Header isSignInOrUpPage={isSignInOrUpPage} />
          <chakra.main
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            height={0}
          >
            <Component {...pageProps} />
          </chakra.main>
          <Footer isSignInOrUpPage={isSignInOrUpPage} />
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
