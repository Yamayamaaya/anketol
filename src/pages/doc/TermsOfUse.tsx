import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
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
  return <MarkdownContainer markdown={markdown} />
}

export default TermsOfUse
