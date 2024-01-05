import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const PrivacyPolicy = () => {
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
        <title>プライバシーポリシー</title>
        <meta property="og:title" content="プライバシーポリシー" />
      </Head>
      <MarkdownContainer markdown={markdown} />
    </>
  )
}

export default PrivacyPolicy
