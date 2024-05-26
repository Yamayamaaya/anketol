import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomSpinner from '@src/components/CustomSpinner'

type PageProps = {
  title: string
  children: React.ReactNode
  isSetUpOGP?: boolean
  isTitleHidden?: boolean
  isAuthPageHidden?: boolean
  loading?: boolean
}

const CustomPage: React.FC<PageProps> = ({
  title,
  children,
  isSetUpOGP = true,
  isTitleHidden = false,
  isAuthPageHidden = false,
  loading = false,
}) => {
  const { push } = useRouter()

  useEffect(() => {
    if (isAuthPageHidden && !loading) {
      push('/signin')
    }
  }, [isAuthPageHidden, loading, push])

  return (
    <>
      {isSetUpOGP && (
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
        </Head>
      )}
      <div className="w-[100vw] flex flex-col items-center">
        {!isTitleHidden && (
          <h1 className="text-2xl my-6 font-bold w-[100vw] text-center">
            {title}
          </h1>
        )}
        {loading && (
          <CustomSpinner caption={'読込中…'} />
        )}
        {(!isAuthPageHidden || !loading) && children}
      </div>
    </>
  )
}

export default CustomPage
