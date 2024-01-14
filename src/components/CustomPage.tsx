import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useRouter } from 'next/router'

type PageProps = {
  title: string
  children: React.ReactNode
  isSetUpOGP?: boolean
  isAuthPage?: boolean
}

const CustomPage: React.FC<PageProps> = ({
  title,
  children,
  isSetUpOGP = true,
  isAuthPage = false,
}) => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid)

  const { push } = useRouter()

  useEffect(() => {
    if (isAuthPage && !user) {
      push('/signin')
    }
  }, [isAuthPage, user, push])

  return (
    <>
      {isSetUpOGP && (
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
        </Head>
      )}
      <div className="w-[100vw]">
        <h1 className="text-2xl my-6 font-bold w-[100vw] text-center">
          {title}
        </h1>
        {children}
      </div>
    </>
  )
}

export default CustomPage
