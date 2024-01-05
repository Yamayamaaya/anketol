import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const SetUpAndHelp = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch('/doc/set-up-and-help.md')
      const text = await res.text()
      setMarkdown(text)
    }
    fetchMarkdown()
  }, [])
  return (
    <>
      <Head>
        <title>セットアップとヘルプ</title>
        <meta property="og:title" content="セットアップとヘルプ" />
      </Head>
      <MarkdownContainer markdown={markdown} />
    </>
  )
}

export default SetUpAndHelp
