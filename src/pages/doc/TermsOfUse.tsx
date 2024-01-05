import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const TermsOfUse = () => {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch('/doc/terms-of-use.md')
      const text = await res.text()
      setMarkdown(text)
    }
    fetchMarkdown()
  }, [])
  return (
    <>
      <Head>
        <title>利用規約</title>
        <meta property="og:title" content="利用規約" />
      </Head>
      <MarkdownContainer markdown={markdown} />
    </>
  )
}

export default TermsOfUse
