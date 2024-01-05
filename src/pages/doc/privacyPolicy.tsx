import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const ogTitle = 'プライバシーポリシー' // ここでOGPタイトルを取得
  return { props: { ogTitle } }
}

const PrivacyPolicy: React.FC<{ ogTitle: string }> = ({ ogTitle }) => {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch('/doc/privacy-policy.md')
      const text = await res.text()
      setMarkdown(text)
    }
    fetchMarkdown()
  }, [])
  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
      </Head>
      <MarkdownContainer markdown={markdown} />
    </>
  )
}

export default PrivacyPolicy
