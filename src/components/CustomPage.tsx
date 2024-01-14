import Head from 'next/head'
import React from 'react'

type PageProps = {
  title: string
  children: React.ReactNode
  isSetUpOGP?: boolean
}

const CustomPage: React.FC<PageProps> = ({
  title,
  children,
  isSetUpOGP = true,
}) => {
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
